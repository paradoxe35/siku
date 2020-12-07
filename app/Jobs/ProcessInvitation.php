<?php

namespace App\Jobs;

use App\Events\ProcessedGuest;
use App\Infrastructure\Cache\CacheJobEvent;
use App\Infrastructure\Send\Send;
use App\Models\Event\Guest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Bus\Batchable;

class ProcessInvitation implements ShouldQueue
{
    use Batchable, Dispatchable, InteractsWithQueue, Queueable, SerializesModels, CacheJobEvent;

    /**
     * @var Guest
     */
    protected $guest;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Guest $guest)
    {
        $this->guest = $guest->withoutRelations();
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        /** @var Send */
        $send = resolve(Send::class);

        $guest =  $this->guest->refresh();

        $procced = $send->proceed($guest);

        /** @var \App\Models\Event\Event */
        $event = $procced->event;

        if ($event->InQueueProcess()) {
            $status = (array) $this->getEventProcess($event->id);

            $this->putEventProcess($event->id, array_merge($status, $event->status()));
        }

        event(new ProcessedGuest($procced));
    }
}
