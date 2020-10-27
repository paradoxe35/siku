<?php

namespace App\Webhooks\Telegram\Commands\Chat;

use App\Infrastructure\Object\PendingChatMessage;
use App\Infrastructure\Vars\TelegramApp;
use App\Repositories\TelegramRefRepository;
use App\User;
use Vinkla\Hashids\Facades\Hashids;

class ChatCommand extends Chat
{
    /**
     * @var string Command Name
     */
    protected $name = "client_chat";

    /**
     * @var string Command Description
     */
    protected $description = "Chat command, Start an instant chat with a SiKu customer. For security reasons, an administrative authentication verification is required (for more details enter this command /check help). To start the discussion with the client enter the command (/client_chat client_id) the client_id you must replace it with the id which will be sent by a discussion request from the client.\n";

    /**
     * @inheritdoc
     */
    public function handle()
    {
        parent::handle();

        $this->autorizedGuardUser();

        $err = $this->warningText("You must provide a valid client ID");

        $client_id = $this->getParamCmd(0);
        /** @var mixed */
        $h = new Hashids;
        $ids = $h::decode($client_id);

        if (!$client_id || empty($ids)) {
            return $this->replyWithMessage(['text' => $err]);
        }

        $id = $ids[0];

        $user = User::query()->find($id);

        if (!$user) {
            return $this->replyWithMessage(['text' => $err]);
        }

        $this->storeAsReference($id, $client_id);

        $this->replyWithSticker(['sticker' => "CAACAgIAAxkBAAIBWF-W39etO1ZP1JW8KCA7fTGMNk0_AAIkCgACbjLYAAFJlxfYUZfOthsE"]);
        // Reply with the commands list
        $this->replyWithMessage(['text' => "The user has been defined as a chat session, now you can chat without a command"]);

        $this->retrievePendingMessages($user);
    }

    /**
     * @param User $user
     * 
     * @return void
     */
    private function retrievePendingMessages(User $user)
    {
        $pending = new PendingChatMessage($user->id);

        foreach ($pending->get() as $msg) {
            $this->replyWithMessage(['text' => "{$user->email}\n{$msg['text']}"]);
        }

        $pending->clear();
    }


    /**
     * refere datas in databases
     * 
     * @param mixed $client_id
     * 
     * @return void
     */
    private function storeAsReference($client_id, $hashId)
    {

        $chatId = $this->chatId();

        $chat = TelegramRefRepository::getByChatId($chatId);

        if ($chat) {

            $chat->fill(['user_id' => $client_id])
                ->save();
        } else {

            $chat = TelegramRefRepository::create([
                'user_id' => $client_id,
                'chat_id' => $chatId
            ]);
        }

        $chat->refresh();

        $this->telegram->sendMessage([
            'chat_id' => TelegramApp::getAppGroupChatId(),
            'text' => "User @{$this->getUpdate()->getChat()->username} has started a chat with customer ID: {$hashId}, email: {$chat->user->email}"
        ]);
    }
}
