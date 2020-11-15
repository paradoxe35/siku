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
     * @var float
     */
    private static $amountMail = 0.01;

    /**
     * @var string
     */
    public static $currency_code = "USD";

    /**
     * @var string
     */
    public static $symbol = '$';


    /**
     * @return float
     */
    public static function getAmount()
    {
        $amount = BasePriceRepository::getAmount();

        return !is_null($amount)  ? $amount : self::$amount;
    }

    /**
     * @return float
     */
    public static function average()
    {
        return self::getAmount() + self::getAmountMail();
    }

    /**
     * @return float
     */
    public static function getAmountMail()
    {
        return  self::$amountMail;
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
