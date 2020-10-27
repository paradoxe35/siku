<?php

namespace App\Webhooks\Telegram\Handlers;

use App\Events\Chat\UserChat;
use App\Infrastructure\Cache\Telegram\CacheAutorizedUser;
use App\Infrastructure\Object\ChatCustomer;
use App\Repositories\TelegramRefRepository;
use Telegram\Bot\Objects\Update;

class SendChatHandler
{
    use CacheAutorizedUser;


    /**
     * @var string
     */
    private $message;

    /**
     * @param Update $update
     * 
     * @return \App\Models\Chat\TelegramReference
     */
    private function canProccess(Update $update)
    {
        $chatId = $update->getChat()->id;

        $text = $update->getMessage()->get('text');

        $autorized = $this->getAutorizedChatId($chatId);

        $ref = TelegramRefRepository::getByChatId($chatId);

        if (!$autorized || !$ref || $update->hasCommand() || !$text) {
            return false;
        }

        $this->message = $text;

        return $ref;
    }

    /**
     * @param Update $update
     * 
     * @return [type]
     */
    public function hanlder(Update $update)
    {
        $ref = $this->canProccess($update);

        if (!$ref) {
            return false;
        }

        $chat = new ChatCustomer();

        $data = $chat->getDatas($ref->user_id);

        if (!$data) {
            return false;
        }

        $chat = new ChatCustomer($ref->user_id, $data[$chat->keyChatOption]);

        $message = [
            'time' => now()->toDateTimeLocalString(),
            'message' => $this->message,
            'user_id' => "tg-{$ref->chat_id}",
            'to_user_id' => $ref->user_id
        ];

        $chat->setMessage($message);

        event(new UserChat($message));
    }
}
