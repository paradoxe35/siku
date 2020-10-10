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
        
        return (new Event($user->event))->toArray(null);
    }
}
