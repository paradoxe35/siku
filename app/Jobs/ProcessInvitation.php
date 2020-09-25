<?php

namespace App\Jobs;

use App\Events\ProcessedGuest;
use App\Models\Event\Guest;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessInvitation implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

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
        event(new ProcessedGuest($this->guest));
    }
}
