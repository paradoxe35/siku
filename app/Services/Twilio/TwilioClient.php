<?php

namespace App\Services\Twilio;

use Twilio\Rest\Pricing\V1\Messaging\CountryInstance;
use Twilio\Rest\Client;

class TwilioClient
{

    /**
     * @return Client
     */
    public function client()
    {
        $env = $this->environment();
        return new Client($env[0], $env[1]);
    }


    /**
     * @param string $iso
     * 
     * @return CountryInstance
     */
    public function country($iso): CountryInstance
    {
        $twilio = $this->client();

        return $twilio->pricing->v1->messaging
            ->countries($iso)
            ->fetch();
    }

    /**
     * @return array
     */
    public function environment(): array
    {
        $sid = env("TWILIO_ACCOUNT_SID");
        $token = env("TWILIO_AUTH_TOKEN");

        return [$sid, $token];
    }

    /**
     * @param string $sid
     * 
     * @return string
     */
    public function statusCallback(string $token): ?string
    {
        $url = env("TWILIO_STATUS_CALLBACK_URL");

        return !$url ? null : ($url[-1] == '/' ? $url . $token : $url . '/' . $token);
    }

    /**
     * @return string
     */
    public function senderId(): string
    {
        $appName = config('app.name');

        return env("TWILIO_SENDER_ID", "$appName Events");
    }
}
