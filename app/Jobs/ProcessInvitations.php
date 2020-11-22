<?php

namespace App\Jobs;

use App\Events\ProcessedGuest;
use App\Infrastructure\Cache\CacheJobEvent;
use App\Infrastructure\Send\Send;
use App\Models\Event\Event;
use App\Models\Event\Guest;
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
        $guests = $this->event->unprocessedGuests();

        /** @var Send */
        $send = resolve(Send::class);

        $guests->each(function (Guest $item) use ($send) {
            $guest = $send->proceed($item);

            $this->putEventProcess($this->event_id, $this->event->status());

            event(new ProcessedGuest($guest));
        });
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed(\Throwable $exception)
    {
        $this->deleteEventProcess($this->event_id);
    }
}
