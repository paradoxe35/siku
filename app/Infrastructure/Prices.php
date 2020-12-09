<?php

namespace App\Infrastructure;

use App\User;

class Prices
{
    /**
     * @return int|null
     */
    public static function validatePrice(User $user, $price, string $svc)
    {
        extract($user->balance(true));

        if ($default_balance) {
            if (!($balance >= $price && ($service === $svc || is_null($service)))) {
                return false;
            }
        } else {
            if ($balance < $price) {
                return false;
            }
        }

        return true;
    }
}
