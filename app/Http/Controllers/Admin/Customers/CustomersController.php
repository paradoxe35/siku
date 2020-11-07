<?php

namespace App\Http\Controllers\Admin\Customers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CustomersController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view('admin.customers.home');
    }
}
