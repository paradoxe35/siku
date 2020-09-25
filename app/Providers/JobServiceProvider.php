<?php

namespace App\Providers;

use App\Infrastructure\Cache\CacheJobEvent;
use App\Jobs\ProcessInvitations;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Queue;
use Illuminate\Queue\Events\JobProcessed;
use Illuminate\Queue\Events\JobProcessing;
use \Illuminate\Contracts\Queue\Job;
use Illuminate\Support\Str;

class JobServiceProvider extends ServiceProvider
{
    use CacheJobEvent;

    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        Queue::before(function (JobProcessing $event) {
            $this->interceptor($event, 'before');
        });

        Queue::after(function (JobProcessed $event) {
            $this->interceptor($event, 'after');
        });
    }



    /**
     * @param Job $job
     * 
     * @return int
     */
    private function eventId($job)
    {
        $command = $job->payload()['data']['command'];
        $s = Str::between($command, "\"event_id\";", "\"job\";");
        $s = Str::between($s, "i:", ";");
        return $s;
    }

    /**
     * @param Job $job
     * 
     * @return void
     */
    private function before(Job $job)
    {
        $eventId = $this->eventId($job);
        $this->putEventProcess($eventId);
    }

    /**
     * @param Job $job
     * 
     * @return void
     */
    private function after(Job $job)
    {
        $eventId = $this->eventId($job);
        $this->deleteEventProcess($eventId);
    }

    /**
     * @param JobProcessing|JobProcessed $event
     * @param string $methode
     * 
     * @return void
     */
    private function interceptor($event, string $methode)
    {
        switch ($event->job->getQueue()) {
            case 'invitation':
                if ($event->job->resolveName() === ProcessInvitations::class) {
                    switch ($methode) {
                        case 'before':
                            $this->before($event->job);
                            break;
                        case 'after':
                            $this->after($event->job);
                            break;
                    }
                }
                break;
        }
    }
}
