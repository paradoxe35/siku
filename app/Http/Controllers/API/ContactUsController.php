<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer\CustomerRequest;
use Illuminate\Http\Request;

class ContactUsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => ['required', 'string'],
            'phone' =>  ['required', 'string'],
            'subject' => ['required', 'string'],
            'message' => ['required', 'string'],
            'sended' => ['required', 'string'],
            'country_name' => ['nullable', 'string'],
            'country_code' => ['nullable', 'string']
        ]);
        CustomerRequest::create([
            'email' => $request->email,
            'phone' => $request->phone,
            'subject' => $request->subject,
            'message' => $request->message,
            'sended' => $request->sended,
            'country_name' => $request->country_name,
            'country_code' => $request->country_code
        ]);
        return response()->json(['message' => 'saved'], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
