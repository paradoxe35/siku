<?php

namespace App\Listeners;

use App\Models\DefaultBalance\DefaultBalance;
use Illuminate\Queue\InteractsWithQueue;
use \Illuminate\Auth\Events\Registered;

class InitUserDefaultBalances
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
     * @param  Registered  $event
     * @return void
     */
    public function handle(Registered $event)
    {
        $this->setDefaultBalances($event);
    }

    /**
     * @param Registered $event
     * 
     * @return void
     */
    private function setDefaultBalances(Registered $event)
    {
        $default = DefaultBalance::query()->first();

        /** @var \App\User */
        $user = $event->user;

        if ($default && !$user->defaultBalance) {

            $user->defaultBalance()->create([
                'mail' => $default->mail,
                'sms' => $default->sms
            ]);
        }
    }
}
