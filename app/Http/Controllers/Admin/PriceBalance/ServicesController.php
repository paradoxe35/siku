<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use App\Services\Twilio\TwilioPricing;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    /**
     * @var TwilioPricing
     */
    private TwilioPricing $twilio;

    /**
     * @param TwilioPricing $twilio
     */
    public function __construct(TwilioPricing $twilio)
    {
        $this->twilio = $twilio;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $twilioPricing = $this->twilio->prices();

        return view('admin.price-balance.services', compact('twilioPricing'));
    }
}
