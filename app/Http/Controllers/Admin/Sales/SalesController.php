<?php

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SalesController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view('admin.sales');
    }
}
