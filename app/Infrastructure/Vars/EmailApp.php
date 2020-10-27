<?php

namespace App\Infrastructure\Vars;

class EmailApp
{
    /**
     * @return string
     */
    public static function getAppEmailAddress()
    {
        return config('mail.app_email');
    }
}
