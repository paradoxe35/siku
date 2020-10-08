<?php

namespace App\Http\Controllers\Customer\Payments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentsController extends Controller
{
    /**
     * Show the application index.
     *
     *  @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('customer.payments');
    }

    /**
     * Show the application new.
     *
     *  @return \Illuminate\Contracts\Support\Renderable
     */
    public function new()
    {
        return view('customer.payments.new');
    }

    /**
     * Show the application pay.
     *
     *  @return \Illuminate\Contracts\Support\Renderable
     */
    public function pay()
    {
        return view('customer.payments.pay');
    }
}
