<?php

namespace App\Services\Twilio;

use Twilio\Rest\Client;

class TwilioClient
{

    public function client()
    {
        $env = $this->environment();
        return new Client($env[0], $env[1]);
    }


    public function country($iso)
    {
        $twilio = $this->client();

        return $twilio->pricing->v1->messaging
            ->countries($iso)
            ->fetch();
    }


    public function environment()
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
    public function statusCallback(string $sid): string
    {
        $url = env("TWILIO_STATUS_CALLBACK_URL");

        return !$url ? null : ($url[-1] == '/' ? $url . $sid : $url . '/' . $sid);
    }
}
