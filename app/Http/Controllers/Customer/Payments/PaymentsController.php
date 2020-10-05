<?php

namespace App\Http\Controllers\Customer\Payments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentsController extends Controller
{
    /**
     * Show the application home.
     *
     *  @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('customer.payments');
    }

    /**
     * Show the application home.
     *
     *  @return \Illuminate\Contracts\Support\Renderable
     */
    public function new()
    {
        return view('customer.payments.new');
    }
}
