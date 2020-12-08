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

    /**
     * @return string
     */
    public static function getAppSuperAdminEmailAddress()
    {
        return config('app.super_admin_email', "siku.admin@gmail.com");
    }
}
