<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\GuestCollection;
use App\Jobs\ProcessInvitations;
use App\Jobs\ProcessInvitation;
use App\Models\Event\Event;
use App\Models\Event\Guest;
use Illuminate\Http\Request;
use Instasent\SMSCounter\SMSCounter;


class EventGuestsController extends Controller
{
    /**
     * @param \Illuminate\Database\Eloquent\Builder $guests
     * 
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    private function paginate($guests)
    {
        return $guests->paginate(5);
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Event $event)
    {
        $guests = $event->guests()->latest();

        $all = request('all');

        return new GuestCollection($all ? $guests->get() :  $this->paginate($guests));
    }

    /**
     * @param string $text
     * @param int $radom
     * @param string $hash
     * @param bool $qr
     * @return string
     */
    public function parseText($text, $radom, $hash, $qr)
    {
        $string = str_replace('{code}', $radom, $text);
        $string = str_replace('{url}', $qr ? route('qrcode', [
            'code' => $radom, 'event' => $hash
        ]) : '', $string);

        return $string;
    }

    /**
     *  Store a newly created resource in storage.
     * 
     * @param Request $request
     * @param Event $event
     * @param SMSCounter $smsCounter
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $event, SMSCounter $smsCounter)
    {
        // get auth event 
        $user = $request->user();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:255', 'regex:/^[0-9\-\(\)\/\+\s]*$/'],
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

        $qr = !!$request->can_include_qrcode;
        $guests = $event->guests();

        $radom = random_int(1000, 99999);
        $sms = $this->parseText($request->text_sms, $radom, $event->hashid(), $qr);
        $whatsapp = $this->parseText($request->text_whatsapp, $radom, $event->hashid(), $qr);

        $smsHidden = $this->parseText($request->text_sms, '******', $event->hashid(), $qr);
        $whatsappHidden = $this->parseText($request->text_whatsapp, '******', $event->hashid(), $qr);

        $smsParsed = $smsCounter->count($sms);


        $guest = $guests->create([
            'user_id' => $user->id,
            'template_id' => $request->template_id,
            'name' => $request->name,
            'phone' => $request->phone,
            'code' => $radom,
            'autorized' => $request->autorized,
            'text_sms' => $sms,
            'text_whatsapp' => $whatsapp,
            'text_sms_hidden_code' => $smsHidden,
            'text_whatsapp_hidden_code' => $whatsappHidden,
            'can_include_qrcode' => $qr,
            'can_send_sms' => !!$request->can_send_sms,
            'can_send_whatsapp' => !!$request->can_send_whatsapp,
            'sms_total' => $smsParsed->messages,
            'country_code' => $request->country_code,
            'country_call' => $request->country_call,
        ]);

        if (!!$request->can_send) {
            $this->dispatchGuestToQueue($guest);
        }

        return new GuestCollection($this->paginate($guests->latest()));
    }


    /**
     * @param Guest $guest
     * 
     * @return void
     */
    private function dispatchGuestToQueue(Guest $guest)
    {
        ProcessInvitation::dispatch($guest)
            ->delay(now()->addSeconds(2))
            ->onQueue('invitation');
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
     * send the specified resource in storage.
     * @param  \App\Models\Event\Event  $event
     * @param  \App\Models\Event\Guest  $guest
     * @return \Illuminate\Http\Response
     */
    public function send(Event $event, Guest $guest)
    {
        $this->dispatchGuestToQueue($guest);
        return [true];
    }

    /**
     * send all resource in storage.
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function sendall(Event $event)
    {
        $process = !$event->InQueueProcess();

        if ($process) {
            ProcessInvitations::dispatch($event, $event->id)
                ->delay(now()->addSeconds(2))
                ->onQueue('invitation');
        }

        $processed = $event->processedGuests()->count();

        return [
            'processed' => $processed,
            'total' => $event->guests->count()
        ];
    }
}
