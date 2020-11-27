<?php

namespace App\Infrastructure\Send;

use App\Services\Twilio\TwilioClient;
use Error;
use Illuminate\Support\Str;

class SMS
{
    /**
     * @param string $phone
     * @param string $text_sms
     * @return array
     */
    public function __invoke(string $phone, string $text_sms)
    {
        $token = Str::random(60);

        $twilio = new TwilioClient();
        $callback = $twilio->statusCallback($token);

        throw new Error;

        throw_if(!$callback, "Twilio status callback url is required");

        $message = $twilio->client()
            ->messages
            ->create($phone, [
                "body" => $text_sms,
                "from" => $twilio->senderId(),
                "statusCallback" => $callback
            ]);

        return [$token, $message];
    }
}
