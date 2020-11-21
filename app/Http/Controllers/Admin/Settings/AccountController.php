<?php

namespace App\Http\Controllers\Admin\Settings;

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
            'phone' => [
                'required', 'string', 'max:255', 'regex:/^[0-9\-\(\)\/\+\s]*$/',
                Rule::unique('users')->ignore($auth->id)
            ],
        ]);

        $user = $auth->fill([
            'name' => $request->name,
            'email' => $request->email,
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
