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
        $sid = getenv("TWILIO_ACCOUNT_SID");
        $token = getenv("TWILIO_AUTH_TOKEN");

        return [$sid, $token];
    }
}
