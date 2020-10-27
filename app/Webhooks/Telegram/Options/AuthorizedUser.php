<?php

namespace App\Webhooks\Telegram\Options;

use App\Infrastructure\Cache\Telegram\CacheAutorizedUser;
use Spatie\Emoji\Emoji;

trait AuthorizedUser
{
    use CacheAutorizedUser;

    /**
     * get user authorization
     * @return void
     */
    public function autorizedGuardUser()
    {
        $chatId = $this->chatId();

        $auth = $this->getAutorizedChatId($chatId);

        if (!$auth) {
            $this->replyWithMessage(['text' => Emoji::CHARACTER_WARNING . " You're not authorized to perform this command, to get more info try(/help)"]);
            exit;
        }
    }
}
