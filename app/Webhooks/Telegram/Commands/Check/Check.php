<?php

namespace App\Webhooks\Telegram\Commands\Check;

use App\Infrastructure\Cache\Telegram\CacheAutorizedUser;
use App\Webhooks\Telegram\Options\CommandParameters;
use Telegram\Bot\Commands\Command;
use Telegram\Bot\Laravel\Facades\Telegram;

class Check extends Command
{

    use CommandParameters, CacheAutorizedUser;

    /**
     * @var string Command Description
     */
    protected $description = "Check command, administrative authentication verification. Usage: /check email:demo@gmail.com password:demopass; the validity session will only last 2 hours.\n";

    /**
     * @inheritdoc
     */
    public function handle()
    {
        $this->isPrivate();
    }
}
