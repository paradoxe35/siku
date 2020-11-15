<?php

namespace App\Infrastructure;

use App\Infrastructure\BasePrice;
use App\Services\Twilio\TwilioPricing;

class ProductPrice
{
    /**
     * @var TwilioPricing
     */
    private TwilioPricing $twilio;

    /**
     * @var string
     */
    public static string $exchangeApi = 'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD';

    /**
     * @param TwilioPricing $twilio
     */
    public function __construct(TwilioPricing $twilio)
    {
        $this->twilio = $twilio;
    }

    /**
     * @param float $sms
     * @return double
     */
    private function smsPrice($sms)
    {
        return null === $sms ? null : $sms;
    }

    /**
     * @param string $country_code
     * @return array
     */
    public function getPrice($country_code)
    {
        $basePrice = BasePrice::getAmount();

        $sms = $this->twilio->parseSmsPrice($country_code);

        $smsUSD = $this->smsPrice(!is_null($sms) ? $sms[$this->twilio->priceKey] : null);

        $smsUnitPrice = (null == $smsUSD || null == $basePrice) ? null  : ($smsUSD + $basePrice);

        return [
            'sms' => !$smsUnitPrice ? null : BasePrice::roundPrice($smsUnitPrice),
            'mail' => BasePrice::getAmountMail()
        ];
    }
}
