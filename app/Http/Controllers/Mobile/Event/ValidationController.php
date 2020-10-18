<?php

namespace App\Http\Controllers\Mobile\Event;

use App\Events\Mobile\ValidatedGuest;
use App\Exceptions\GuestNotFoundException;
use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\Guest;
use App\Http\Resources\Attend\Attend;

use App\Models\Event\Event;
use Illuminate\Http\Request;

class ValidationController extends Controller
{
    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function validation(Request $request)
    {
        $request->validate([
            'code' => 'required'
        ]);
        /**
         * @var \App\Models\Event\Validator
         */
        $user = $request->user();

        /**
         * @var Event
         */
        $event = $user->event;

        /**
         * @var \App\Models\Event\Guest
         */
        $guest = $event->guests()->where('code', $request->code)->first();
        if (!$guest) {
            throw new GuestNotFoundException;
        }

        /**
         * @var \App\Models\Event\Attend
         */
        $attend = $guest->attend;

        if ($attend) {
            return [
                'message' => trans('Sujet déjà validé'),
                'data' => new Attend($attend)
            ];
        }

        $attend = $guest->attend()->create([
            'event_id' => $event->id,
            'user_id' => $guest->user_id,
            'validator_id' => $user->id
        ]);

        event(new ValidatedGuest($attend));

        return response()->json([
            'message' => 'Sujet validé',
            'data' => new Attend($attend)
        ], 201);
    }
}
