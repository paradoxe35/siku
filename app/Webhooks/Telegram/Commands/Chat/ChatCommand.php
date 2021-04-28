<?php

namespace App\Webhooks\Telegram\Commands\Chat;

use App\Infrastructure\Object\PendingChatMessage;
use App\Infrastructure\Vars\TelegramApp;
use App\Notifications\Telegram\NotifyAdmin;
use App\Repositories\TelegramRefRepository;
use App\User;
use Illuminate\Support\Facades\Notification;

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

        if (!$client_id) {
            return $this->replyWithMessage(['text' => $err]);
        }

        $user = User::query()->findByHashid($client_id);


        if (!$user) {
            return $this->replyWithMessage(['text' => $err]);
        }

        $id = $user->id;

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

            if (isset($msg['file']) && !is_null($msg['file'])) {

                $this->retrievePendingMessagesFile($msg, $user);
            } else {
                $this->replyWithMessage(['text' => "{$user->email}\n{$msg['message']}"]);
            }
        }

        $pending->clear();
    }


    /**
     * @param array $user
     * 
     * @return void
     */
    private function retrievePendingMessagesFile(array $message, User $user)
    {
        Notification::route('telegram', $this->chatId())
            ->notify(new NotifyAdmin($message, $user));
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

        $chat = TelegramRefRepository::getByUserId($client_id);

        $dataChat = $this->getUpdate()->getChat();

        $name = $dataChat->first_name . ' ' . $dataChat->last_name;

        if ($chat) {

            $chat->fill(['chat_id' => $chatId, 'chat_username' => $name])
                ->save();
        } else {

            $chat = TelegramRefRepository::create([
                'user_id' => $client_id,
                'chat_id' => $chatId,
                'chat_username' => $name
            ]);
        }

        $chat->refresh();

        $this->telegram->sendMessage([
            'chat_id' => TelegramApp::getAppGroupChatId(),
            'text' => "User " . ($dataChat->username ? '@' . $dataChat->username : $name) . "\nhas started a chat with customer ID: {$hashId}, email: {$chat->user->email}"
        ]);
    }
}
