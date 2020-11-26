<?php

namespace App\Http\Controllers\Webhooks\Twilio;

use App\Http\Controllers\Controller;
use App\Services\Twilio\TwilioClient;
use Illuminate\Http\Request;

class StatusCallbackController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, TwilioClient $twilioClient, $token)
    {
        try {
            $message = $twilioClient->client()->messages("SM8d67a960647047d5a0b201491as6b4416")->fetch();

            // $token = Str::random(60);

            // $sms = $twilioClient->client()->messages->create("+250786284513", [
            //     "body" => "Bonjour ca va ? " . Str::random(20),
            //     "from" => "PNG Test",
            //     "statusCallback" => $twilioClient->statusCallback($token)
            // ]);

        } catch (\Throwable $th) {
            $th->getMessage();
        }
    }
}
