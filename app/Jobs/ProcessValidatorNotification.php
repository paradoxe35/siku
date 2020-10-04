<?php

namespace App\Jobs;

use App\Infrastructure\Send\Send;
use App\Models\Event\Validator;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessValidatorNotification implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * @var Validator
     */
    protected $validator;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(Validator $validator)
    {
        $this->validator = $validator->withoutRelations();
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

        $send->proceedValidator($this->validator);

    }
}
