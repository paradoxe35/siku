<?php

namespace App\Webhooks\Telegram\Commands\Check;

use App\Repositories\TelegramRefRepository;
use Spatie\Emoji\Emoji;

class DisconnectCommand extends Check
{
    /**
     * @var string Command Name
     */
    protected $name = "check_disconnect";

    /**
     * @var string
     */
    protected $description = "Destroy the authenticated session. \n";
    /**
     * @inheritdoc
     */
    public function handle()
    {
        parent::handle();

        $this->deleteAutorizedChatId($this->chatId());

        TelegramRefRepository::deleteByChatId($this->chatId());

        $this->replyWithMessage(['text' => Emoji::CHARACTER_CHECK_MARK . ' Destroyed']);
    }
}
