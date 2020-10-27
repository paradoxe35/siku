<?php

namespace App\Webhooks\Telegram\Commands\Chat;

use App\Webhooks\Telegram\Options\AuthorizedUser;
use App\Webhooks\Telegram\Options\CommandParameters;
use Telegram\Bot\Commands\Command;

class Chat extends Command
{

    use CommandParameters, AuthorizedUser;

    /**
     * @inheritdoc
     */
    public function handle()
    {
        $this->isPrivate();
    }
}
