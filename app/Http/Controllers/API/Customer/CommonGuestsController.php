<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonGuest\CommonGuest as CommonGuestResource;
use App\Http\Resources\CommonGuest\CommonGuestCollection;
use App\Models\CommonGuest;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CommonGuestsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        /** @var \App\User */
        $user = $request->user();

        return new CommonGuestCollection($user->commonGuests()->latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        /** @var \App\User */
        $user = $request->user();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'nullable', 'email', 'max:255',
                Rule::unique('common_guests')->where('user_id', $user->id)
            ],
            'phone' => [
                'nullable', 'string', 'max:255', 'regex:/^[0-9\-\(\)\/\+\s]*$/',
                Rule::unique('common_guests')->where('user_id', $user->id)
            ],
            'country_code' => ['nullable', 'string'],
            'country_call' => ['nullable', 'string']
        ]);



        abort_if(
            $user->commonGuests->count() >= 100,
            400,
            trans('Vous pouvez pas enregistrer plus :count modèles', ['count' => 100])
        );

        // store event tamplate
        $guest = $user->commonGuests()->create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'country_code' => $request->country_code,
            'country_call' => $request->country_call,
        ]);

        return new CommonGuestResource($guest);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\CommonGuest  $commonGuest
     * @return \Illuminate\Http\Response
     */
    public function destroy(CommonGuest $commonGuest)
    {
        $commonGuest->delete();
        return new CommonGuestResource($commonGuest);
    }
}
