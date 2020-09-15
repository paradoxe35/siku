<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\GuestCollection;
use App\Models\Event\Event;
use App\Models\Event\Guest;
use Illuminate\Http\Request;

class EventGuestsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Event $event)
    {
        $guests = $event->guests()->latest();

        $all = request('all');

        return new GuestCollection($all ? $guests->get() :  $guests->paginate());
    }

    /**
     * @param string $text
     * @param int $radom
     * @param string $hash
     * @return string
     */
    public function parseText($text, $radom, $hash)
    {
        $string = str_replace('{code}', $radom, $text);
        $string = str_replace('{url}', route('qrcode', [
            'code' => $radom, 'event' => $hash
        ]), $string);

        return $string;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $event)
    {
        // get auth event 
        $user = $request->user();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255'],
            'template_id' => ['required', 'numeric'],
            'autorized' => ['required', 'numeric', 'min:1'],
            'text_sms' => ['nullable', 'string'],
            'text_whatsapp' => ['nullable', 'string'],
            'can_include_qrcode' => ['nullable'],
            'can_send' => ['nullable'],
            'can_send_sms' => ['nullable'],
            'can_send_whatsapp' => ['nullable'],
            'sms_total' => ['required', 'numeric'],
            'country_code' => ['required', 'string'],
            'country_call' => ['required', 'string']
        ]);

        $guests = $event->guests();

        $radom = random_int(1000, 99999);
        $sms = $this->parseText($request->text_sms, $radom, $event->hashid());
        $whatsapp = $this->parseText($request->text_whatsapp, $radom, $event->hashid());

        $guest = $guests->create([
            'user_id' => $user->id,
            'template_id' => $request->template_id,
            'name' => $request->name,
            'phone' => $request->phone,
            'code' => $radom,
            'autorized' => $request->autorized,
            'text_sms' => $sms,
            'text_whatsapp' => $whatsapp,
            'can_include_qrcode' => !!$request->can_include_qrcode,
            'can_send_sms' => !!$request->can_send_sms,
            'can_send_whatsapp' => !!$request->can_send_whatsapp,
            'sms_total' => $request->sms_total,
            'country_code' => $request->country_code,
            'country_call' => $request->country_call
        ]);

        if (!!$request->can_send) {
            // code
        }

        return new GuestCollection($guests->latest()->paginate());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event\Guest  $guest
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event, Guest $guest)
    {
        $guest->delete();

        $guests = $event->guests();

        return new GuestCollection($guests->latest()->paginate());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event\Guest  $guest
     * @return \Illuminate\Http\Response
     */
    public function show(Guest $guest)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event\Guest  $guest
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Guest $guest)
    {
        //
    }
}
