<?php

namespace App\Listeners;

use App\Events\CreatedUserEvent;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;

class NotifyCreatedUserEvent
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     *
     * @param  CreatedUserEvent  $event
     * @return void
     */
    public function handle(CreatedUserEvent $event)
    {
        //
    }
}
