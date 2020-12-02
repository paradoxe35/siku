<?php

namespace App\Infrastructure\Send;

use App\Mail\GuestMessage;
use App\Models\Event\Guest;
use Illuminate\Support\Facades\Mail as MailSend;

class Mail
{
    /**
     * @param Guest $guest
     * 
     * @return void
     */
    public function __invoke(Guest $guest)
    {
        MailSend::to($guest->email)
            ->send(new GuestMessage($guest));
    }
}
