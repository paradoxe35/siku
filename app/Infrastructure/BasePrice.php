<?php

namespace App\Infrastructure;

use App\Repositories\BasePriceRepository;

/**
 * [Description BasePrice]
 */
class BasePrice
{

    /**
     * @var float
     */
    private static $amount = 0.058;

    /**
     * @param BaseRepository $rs
     * 
     * @return float
     */
    public static function getAmount(BasePriceRepository $rs)
    {
        return /* $rs->getAmount() ?: */ self::$amount;
    }

    /**
     * @param float $amount
     * @return float
     */
    public static function roundPrice($amount) {
        return round($amount, 3);
    }
}
