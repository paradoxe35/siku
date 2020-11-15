<?php

namespace App\Repositories;

use App\Models\BasePrice;

class BasePriceRepository
{
    /**
     * @return array
     */
    public static function getAmount()
    {
        $first = BasePrice::query()->first();

        return $first ? [
            'sms' => $first->amount_sms,
            'mail' => $first->amount_mail
        ] : null;
    }
}
