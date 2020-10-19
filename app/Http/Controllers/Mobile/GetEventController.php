<?php

namespace App\Http\Controllers\Mobile;

use App\Http\Controllers\Controller;
use App\Http\Resources\Event\Event;
use Illuminate\Http\Request;

class GetEventController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        /** @var \App\Models\Event\Validator  */
        $user = $request->user();
        $event = $user->event;
        $admin = $event->user;

        return array_merge((new Event($event ))->toArray(null), ['admin' => [
            'email' => $admin->email,
            'phone' => $admin->phone
        ]]);
    }
}
