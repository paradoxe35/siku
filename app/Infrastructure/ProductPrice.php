<?php

namespace App\Infrastructure;

use App\Infrastructure\BasePrice;
use App\Repositories\BasePriceRepository;
use App\Services\Nexmo\NexmoPricing;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class PriceUSD
{
    private static $price = null;
    public static function get()
    {
        return self::$price;
    }
    public static function set($v)
    {
        self::$price = $v;
    }
}

class ProductPrice
{
    /**
     * @var NexmoPricing
     */
    private NexmoPricing $nexmo;

    /**
     * @var string
     */
    public static string $exchangeApi = 'https://api.exchangeratesapi.io/latest?base=EUR&symbols=USD';

    /**
     * @var BasePriceRepository
     */
    private BasePriceRepository $baseRp;

    /**
     * @param NexmoPricing $nexmo
     */
    public function __construct(NexmoPricing $nexmo, BasePriceRepository $baseRp)
    {
        $this->nexmo = $nexmo;
        $this->baseRp = $baseRp;
    }

    /**
     * @param float $sms
     * @return double
     */
    private function smsPrice($sms)
    {
        $eurToUsd = $this->USDbase();
        return null === $sms || null === $eurToUsd ? null : ($eurToUsd * $sms);
    }

    /**
     * @param string $country_code
     * @return array
     */
    public function getPrice($country_code)
    {
        $basePrice = BasePrice::getAmount($this->baseRp);
        $sms = $this->nexmo->parseSmsPrice($country_code);
        $smsUSD = $this->smsPrice($sms['Price (EUR) / message']);
        $smsUnitPrice = ($smsUSD + $basePrice);
        return [
            'sms' => !$smsUnitPrice ?: BasePrice::roundPrice($smsUnitPrice),
            'whatsapp' => null
        ];
    }

    /**
     * @param integer $amount
     * @return integer|null
     */
    public function USDbase()
    {
        // get change from runtime
        $get = PriceUSD::get();
        if ($get) return $get;

        // return cache result
        $cache = Cache::get('PriceUSD');
        
        if ($cache) {
            PriceUSD::set($cache);
            return $cache;
        }

        try {
            $response = Http::timeout(5)->get(self::$exchangeApi);

            if (!$response->ok()) return null;

            $rates = (object) $response->json()['rates'];
            PriceUSD::set($rates->USD);
            // cache result
            Cache::put('PriceUSD', $rates->USD, (600 * 3));

            return $rates->USD;
        } catch (\Throwable $th) {
            //throw $th;
        }
        return null;
    }
}
