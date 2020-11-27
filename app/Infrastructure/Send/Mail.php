<?php

namespace App\Infrastructure\Send;

use App\Models\Event\Guest;
use Error;

class Mail
{
    /**
     * @param Guest $guest
     * 
     * @return void
     */
    public function __invoke(Guest $guest)
    {
        // throw new Error('Error petit frere');
    }
}
