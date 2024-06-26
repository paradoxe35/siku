<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    public function __construct()
    {
    }


    /**
     * Show the application home.
     *
     *  @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('customer.account');
    }

    /**
     * Show the application home.
     *
     *  @return \Illuminate\Contracts\Support\Renderable
     */
    public function password()
    {
        return view('customer.account.password');
    }
}
