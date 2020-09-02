<?php

namespace App\Http\Controllers;

use App\Services\Nexmo\NexmoPricing;
use Illuminate\Http\Request;

class PricingController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, NexmoPricing $nexmo)
    {
        return view('pricing');
    }
}
