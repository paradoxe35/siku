<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AccountController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $auth = $request->user();
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required', 'string', 'email', 'max:255',
                Rule::unique('users')->ignore($auth->id)
            ],
            'country_code' => ['required', 'string', 'max:255'],
            'country_name' => ['required', 'string', 'max:255'],
        ]);

        $user = $auth->fill([
            'name' => $request->name,
            'email' => $request->email,
            'country_name' => $request->country_name,
            'country_code' => $request->country_code
        ]);

        $user->save();

        $user->refresh();

        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updatePhone(Request $request)
    {
        $auth = $request->user();
        $request->validate([
            'phone' => [
                'required', 'string', 'max:255', 'regex:/^[0-9\-\(\)\/\+\s]*$/',
                Rule::unique('users')->ignore($auth->id)
            ],
        ]);

        $user = $auth->fill([
            'phone' => $request->phone,
        ]);

        $user->save();

        $user->refresh();

        return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updatePassword(Request $request)
    {
        $auth = $request->user();
        $request->validate([
            'current_password' => ['required', 'string', 'max:255', 'password:api'],
            'password' => ['required', 'string', 'max:255', 'min:8', 'confirmed'],
        ]);

        $user = $auth->fill([
            'password' => Hash::make($request->password),
        ]);

        $user->save();

        return $user;
    }
}
