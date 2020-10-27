<?php

namespace App\Webhooks\Telegram\Commands\Check;

class HelpCommand extends Check
{
    /**
     * @var string Command Name
     */
    protected $name = "check_help";

    /**
     * @inheritdoc
     */
    public function handle()
    {
        parent::handle();

        $this->replyWithMessage(['text' => $this->description]);
    }
}
