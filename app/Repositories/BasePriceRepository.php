<?php

namespace App\Repositories;

use App\Models\BasePrice;

class BasePriceRepository
{
    /**
     * @return int
     */
    public static function getAmount()
    {
        $first = BasePrice::query()->first();

        return $first ? $first->amount : null;
    }
}
