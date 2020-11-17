<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PricesController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.price-balance.prices');
    }
}
