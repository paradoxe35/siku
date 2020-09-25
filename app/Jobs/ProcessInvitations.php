<?php

namespace App\Jobs;

use App\Infrastructure\Cache\CacheJobEvent;
use App\Models\Event\Event;
use Error;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessInvitations implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels, CacheJobEvent;

    /**
     * @var Event
     */
    protected $event;


    /**
     * @var int
     */
    public $event_id;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Event $event, $event_id)
    {
        $this->event = $event;
        $this->event_id = $event_id;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $guests = $this->event->guests->filter(function ($v, $k) {
            $h = $v->sendHistorical;
            $sended_sms = $h ? $h->sended_sms : false;
            $sended_whatsapp = $h ? $h->sended_whatsapp : false;
            return (!$sended_sms || !$sended_whatsapp);
        });
    }
}
