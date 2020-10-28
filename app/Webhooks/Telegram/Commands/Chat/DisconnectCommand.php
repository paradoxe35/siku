<?php

namespace App\Webhooks\Telegram\Commands\Chat;

use App\Repositories\TelegramRefRepository;
use Spatie\Emoji\Emoji;

class DisconnectCommand extends Chat
{
    /**
     * @var string Command Name
     */
    protected $name = "client_chat_disconnect";

    /**
     * @var string Command Description
     */
    protected $description = "Destroy the client session chat. \n";

    /**
     * @inheritdoc
     */
    public function handle()
    {
        parent::handle();

        TelegramRefRepository::deleteByChatId($this->chatId());

        // Reply with the commands list
        $this->replyWithMessage(['text' => Emoji::CHARACTER_CHECK_MARK . ' Disconnected']);
    }
}
