<?php

namespace App\Webhooks\Telegram\Commands;

use App\Repositories\TelegramRefRepository;
use App\Webhooks\Telegram\Options\AuthorizedUser;
use App\Webhooks\Telegram\Options\CommandParameters;
use Spatie\Emoji\Emoji;
use Telegram\Bot\Commands\Command;

class SessionCommand extends Command
{
    use CommandParameters, AuthorizedUser;

    /**
     * @var string Command Name
     */
    protected $name = "session";

    /**
     * @var string Command Description
     */
    protected $description = "Get status of your current session if you're authenticated. \n";

    /**
     * @inheritdoc
     */
    public function handle()
    {
        $this->isPrivate();

        $this->autorizedGuardUser();

        $ref = TelegramRefRepository::getByChatId($this->chatId());

        $this->replyWithMessage(['text' => Emoji::CHARACTER_CHECK_MARK_BUTTON . " You're authenticated"]);

        if ($ref) {
            /** @var \App\User */
            $user = $ref->user;

            $this->replyWithMessage(['text' => "Your chat client is: \n Email: $user->email \n Name: $user->name \n ID: {$user->hashId()}"]);
        } else {
            $this->replyWithMessage(['text' => 'No chat currently in target']);
        }
    }
}
