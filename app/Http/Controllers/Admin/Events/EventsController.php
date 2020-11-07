<?php

namespace App\Http\Controllers\Admin\Events;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index() {
        return view('admin.events.home');
    }
}
