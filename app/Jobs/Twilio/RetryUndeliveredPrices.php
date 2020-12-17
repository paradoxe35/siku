<?php

namespace App\Jobs\Twilio;

use App\Http\Controllers\Webhooks\Twilio\StatusCallbackController;
use App\Models\Twilio\TwilioSms;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Batchable;


class RetryUndeliveredPrices implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var TwilioSms
     */
    private $twlsms;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(TwilioSms $twilioSms)
    {
        $this->twlsms = $twilioSms;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        /** @var StatusCallbackController */
        $controller = resolve(StatusCallbackController::class);

        $twlsms = $this->twlsms;

        $controller->handle($twlsms->token, $twlsms->sid, $twlsms->status, true);
    }
}
