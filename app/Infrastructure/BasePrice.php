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
     * @var string
     */
    public static $currency_code = "USD";

    /**
     * @var string
     */
    public static $symbol = '$';


    /**
     * @param BaseRepository $rs
     * 
     * @return float
     */
    public static function getAmount()
    {
        return /* $rs->getAmount() ?: */ self::$amount;
    }

    /**
     * @param float $amount
     * @return float
     */
    public static function roundPrice($amount)
    {
        return round($amount, 2);
    }
}
