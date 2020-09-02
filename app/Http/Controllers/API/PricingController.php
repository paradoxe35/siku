<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Infrastructure\BasePrice;
use App\Repositories\BasePriceRepository;
use App\Services\Nexmo\NexmoPricing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class PricingController extends Controller
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
        return ($this->USDbase() * $sms);
    }

    /**
     * @param Request $request
     * @return array
     */
    public function getByCountry(Request $request)
    {
        $code = $request->query('country_code') ?: abort(400);
        $basePrice = BasePrice::getAmount($this->baseRp);
        $sms = $this->smsParsePrice($code);
        $smsUSD = $this->smsPrice($sms['Price (EUR) / message']);
        return [
            'prices' => [
                'sms' => BasePrice::roundPrice(($smsUSD + $basePrice)),
                'whatsapp' => null
            ],
        ];
    }

    /**
     * @param string|null $code
     * @return array
     */
    private function smsParsePrice($code)
    {
        return collect($this->nexmo->prices())
            ->firstWhere('Country Code', $code) ?: abort(404);
    }

    /**
     * @param integer $amount
     * @return integer|null
     */
    public function USDbase()
    {
        $response = Http::get(self::$exchangeApi);
        if (!$response->ok()) return null;
        $rates = (object) $response->json()['rates'];
        return $rates->USD;
    }
}
