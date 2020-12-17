<?php

namespace App\Services\Twilio;

use App\Jobs\Twilio\RetryUndeliveredPrices;
use App\Models\Twilio\TwilioSms;
use Illuminate\Support\Facades\Bus;

class StatusCallbackQueue
{

    public static function proceed()
    {
        $twlsms = TwilioSms::query()
            ->where(function ($query) {
                return $query->where('status', 'delivered')
                    ->orWhere('status', 'send')
                    ->orWhere('status', 'queued');
            })
            ->where('price')
            ->get()
            ->map(fn ($m) => new RetryUndeliveredPrices($m))
            ->all();

        if (!empty($twlsms)) {
            Bus::batch($twlsms)->dispatch();
        }
    }
}
