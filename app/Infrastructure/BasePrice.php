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
    private static $amountSms = 0.048;

    /**
     * @var float
     */
    private static $amountMail = 0.02;

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
    public static function getAmountSms()
    {
        $amount = BasePriceRepository::getAmount();

        return !is_null($amount)  ? $amount['sms'] : self::$amountSms;
    }

    /**
     * @return float
     */
    public static function getTotalAmount()
    {
        return self::getAmountSms() + (self::getAmountMail() / 2);
    }

    /**
     * @return float
     */
    public static function getAmountMail()
    {
        $amount = BasePriceRepository::getAmount();
        return !is_null($amount) ? $amount['mail'] : self::$amountMail;
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
