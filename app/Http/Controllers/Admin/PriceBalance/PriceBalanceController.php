<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PriceBalanceController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return redirect(route('admin.price-balance.custom-payment'));
    }
}
