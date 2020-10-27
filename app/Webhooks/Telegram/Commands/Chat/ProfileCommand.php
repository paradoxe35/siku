<?php

namespace App\Webhooks\Telegram\Commands\Chat;

use App\Infrastructure\BasePrice;
use App\Repositories\TelegramRefRepository;

class ProfileCommand extends Chat
{
    /**
     * @var string Command Name
     */
    protected $name = "client_chat_profile";

    /**
     * @var string Command Description
     */
    protected $description = "Get the customer profile of a targeted discussion. \n";

    /**
     * @inheritdoc
     */
    public function handle()
    {
        parent::handle();

        $this->autorizedGuardUser();

        $ref = TelegramRefRepository::getByChatId($this->chatId());

        if (!$ref) {
            return $this->replyWithMessage(['text' => $this->warningText("Client profile currently unavailable")]);
        }

        /** @var \App\User  */
        $user = $ref->user;

        $symbol = BasePrice::$symbol;

        $content = '';

        $payData = $user->payData();

        $content .= "Email: {$user->email}\n";
        $content .= "Name: {$user->name}\n";
        $content .= "ID: {$user->hashId()}\n";
        $content .= "Events Saved: {$user->events()->count()}\n";
        $content .= "Balance: $symbol{$user->balance()}\n";
        $content .= "Consumed: $symbol{$user->totalConsumeds()}\n";

        if ($payData) {
            $content .= "PayData Amount: {$payData['price']}\n";
            $content .= "PayData Guests: {$payData['guests']}\n";
        }

        // Reply with the commands list
        $this->replyWithMessage(['text' => $content]);
    }
}
