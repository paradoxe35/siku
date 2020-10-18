<?php

namespace App\Http\Controllers\Mobile\Auth;

use App\Exceptions\NotActiveEventException;
use App\Http\Controllers\Controller;
use App\Http\Resources\Event\Event;
use App\Http\Resources\Validator\Validator as ValidatorResource;
use App\Models\Event\Validator;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class AuthenticationController extends Controller
{
    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function token(Request $request)
    {
        $request->validate([
            'username' => 'required',
            'device_name' => 'required',
        ]);

        /** @var Validator  */
        $validator = Validator::where('username', $request->username)->first();

        if (!$validator) {
            throw ValidationException::withMessages([
                'username' => ["Les informations d'identification fournies sont incorrectes."],
            ]);
        }

        $event = $validator->event;

        if (!$event->active) {
            throw new NotActiveEventException;
        }

        $token = $validator->createToken($request->device_name)->plainTextToken;

        return [
            'token' => $token,
            'auth' => new ValidatorResource($validator),
            'event' => (new Event($event))->toArray(null)
        ];
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function destroyToken(Request $request)
    {
        /** @var Validator  */
        $validator = $request->user();

        $id = $validator->currentAccessToken()->id;

        $validator->tokens()->where('id', $id)->delete();

        return response()->json([true], 200);
    }


    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function user(Request $request)
    {
        $auth = $request->user();
        return new ValidatorResource($auth);
    }
}
