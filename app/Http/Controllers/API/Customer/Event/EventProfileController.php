<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Models\Event\Event;
use Illuminate\Http\Request;

class EventProfileController extends Controller
{
    /**
     * @param Event $event
     * 
     * @return [type]
     */
    public function profile(Event $event) {


        return [
            "send" => 0,
            "fail" => 0,
            "wait" => 0
        ];
    }
}
