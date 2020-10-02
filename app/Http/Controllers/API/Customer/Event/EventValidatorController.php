<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\Validator\Validator as ResourcesValidator;
use App\Http\Resources\Validator\ValidatorCollection;
use App\Models\Event\Event;
use App\Models\Event\Validator;
use Illuminate\Http\Request;

class EventValidatorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Event $event)
    {
        $guests = $event->validators()->latest();
        return new ValidatorCollection($guests->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $event)
    {
        $user = $request->user();

        $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:validators'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'can_notify' => ['nullable'],
            'country_code' => ['required', 'string'],
            'country_call' => ['required', 'string']
        ]);

        abort_if(
            $event->validators->count() >= 20,
            400,
            trans('Vous pouvez pas enregistrer plus :count utilisateurs', ['count' => 20])
        );

        $instance = $event->validators();

        $validator = $instance->create([
            'name' => $request->name,
            'username' => $request->username,
            'phone' => $request->phone,
            'country_code' => $request->country_code,
            'country_call' => $request->country_call,
            'user_id' => $user->id
        ]);

        if (!!$request->can_notify) {
            # code...
        }


        return new ResourcesValidator($validator);
    }


    /**
     * Remove the specified resource from storage.
     * @param  \App\Models\Event\Event  $event
     * @param  \App\Models\Event\Validator  $validator
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event, Validator $validator)
    {
        $validator->delete();
        return new ResourcesValidator($validator);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event\Validator  $validator
     * @return \Illuminate\Http\Response
     */
    public function show(Validator $validator)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event\Validator  $validator
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Validator $validator)
    {
        //
    }
}
