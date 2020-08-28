<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ReportController extends Controller
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
        return view('customer.report');
    }
}
