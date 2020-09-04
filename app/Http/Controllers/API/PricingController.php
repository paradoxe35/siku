<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Infrastructure\ProductPrice;
use Illuminate\Http\Request;

class PricingController extends Controller
{

    /**
     * @param Request $request
     * @return array
     */
    public function getByCountry(Request $request, ProductPrice $product)
    {
        $code = $request->query('country_code') ?: abort(400);
        return [
            'prices' => $product->getPrice($code),
        ];
    }
}
