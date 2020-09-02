<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeDashController extends Controller
{
    public function __construct()
    {
        
    }

    public function index() {
        return view('admin.home');
    }
}
