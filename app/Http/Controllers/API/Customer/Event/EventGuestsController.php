<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\GuestCollection;
use App\Jobs\ProcessInvitation;
use App\Models\CommonGuest;
use App\Models\Event\Event;
use App\Models\Event\Guest;
use App\Models\Template\Template;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Instasent\SMSCounter\SMSCounter;
use Illuminate\Bus\Batch;
use Illuminate\Support\Facades\Bus;
use App\Infrastructure\Cache\CacheJobEvent;

class EventGuestsController extends Controller
{
    use CacheJobEvent;

    /**
     * @var SMSCounter
     */
    private SMSCounter $smsCounter;

    /**
     * @param SMSCounter $smsCounter
     */
    public function __construct(SMSCounter $smsCounter)
    {
        $this->smsCounter = $smsCounter;
    }


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
    public function parseText($text, $radom, $hash, $qr, $name = '')
    {
        $string = str_replace('{name}', $name, $text);
        $string = str_replace('{code}', $radom, $string);
        $string = str_replace('{url}', $qr ? route('qrcode', [
            'code' => $radom, 'event' => $hash
        ]) : '', $string);

        return $string;
    }


    /**
     * @param bool $qr
     * @param string $text_sms
     * @param string $text_mail
     * @param string $hashid
     * 
     * @return array
     */
    public function replaceToCode(bool $qr, string $text_sms, string  $text_mail, string $hashid, string $name = '')
    {
        $radom = random_int(1000, 99999);
        $sms = $this->parseText($text_sms, $radom, $hashid, $qr, $name);
        $mail = $this->parseText($text_mail, $radom, $hashid, $qr, $name);

        $smsHidden = $this->parseText($text_sms, '******', $hashid, $qr, $name);
        $mailHidden = $this->parseText($text_mail, '******', $hashid, $qr, $name);

        return compact('radom', 'sms', 'mail', 'smsHidden', 'mailHidden');
    }

    /**
     *  Store a newly created resource in storage.
     * 
     * @param Request $request
     * @param Event $event
     * 
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Event $event)
    {
        // get auth event 
        $user = $request->user();

        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'template_id' => ['required', 'numeric'],
            'sms_total' => ['required', 'numeric'],
            'autorized' => ['required', 'numeric', 'min:1'],
            'email' => [
                'nullable', 'email', 'max:255',
                Rule::unique('guests')->where('event_id', $event->id)
            ],
            'phone' => [
                'nullable', 'string', 'max:255', 'regex:/^[0-9\-\(\)\/\+\s]*$/',
                Rule::unique('guests')->where('event_id', $event->id)
            ],
            'country_code' => ['nullable', 'string'],
            'country_call' => ['nullable', 'string'],
            'text_sms' => ['nullable', 'string'],
            'text_mail' => ['nullable', 'string'],
            'can_include_qrcode' => ['nullable'],
            'can_send' => ['nullable'],
            'icalendar' => ['nullable'],
            'can_send_sms' => ['nullable'],
            'can_send_mail' => ['nullable'],
        ]);

        $guests = $event->guests();

        $qr = !!$request->can_include_qrcode;

        $datas = $this->replaceToCode($qr, $request->text_sms, $request->text_mail, $event->hashid());

        $smsParsed = $this->smsCounter->count($datas['sms']);

        $guest = $guests->create([
            'user_id' => $user->id,
            'template_id' => $request->template_id,
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'code' => $datas['radom'],
            'autorized' => $request->autorized,
            'text_sms' => $datas['sms'],
            'text_mail' => $datas['mail'],
            'text_sms_hidden_code' => $datas['smsHidden'],
            'text_mail_hidden_code' => $datas['mailHidden'],
            'can_include_qrcode' => $qr,
            'can_send_sms' => !!$request->can_send_sms,
            'can_send_mail' => !!$request->can_send_mail,
            'sms_total' => $smsParsed->messages,
            'country_code' => $request->country_code,
            'country_call' => $request->country_call,
            'can_include_icalendar' => !!$request->icalendar
        ]);

        if (!!$request->can_send) {
            $this->dispatchGuestToQueue($guest);
        }

        return new GuestCollection($this->paginate($guests->latest()));
    }

    /**
     * import a newly created resource in storage.
     * 
     * @param Request $request
     * @param Event $event
     * 
     * @return \Illuminate\Http\Response
     */
    public function importFromCommon(Request $request, Event $event)
    {
        $request->validate([
            'template_id' => ['required', 'numeric'],
            'can_include_qrcode' => ['nullable'],
            'can_send_sms' => ['nullable'],
            'can_send_mail' => ['nullable'],
            'guests_ids' => ['required', 'string']
        ]);

        $guests = $event->guests();

        /** @var \App\User */
        $user = $request->user();

        $ids = explode(',', $request->guests_ids);

        $template = Template::find($request->template_id);

        collect($ids)
            ->map(fn ($id) => trim($id))

            ->filter(fn ($id) => !empty($id))

            ->filter(fn ($id) => $guests->newModelInstance()
                ->where('common_guest_id', [$id])
                ->where('event_id', $event->id)
                ->doesntExist())

            ->each(function ($id) use ($request, $user, $template, $guests, $event) {

                $commonGuest = CommonGuest::find($id);

                $this->saveCommonGuest($commonGuest, $request, $user, $template, $guests, $event);
            });

        $guests = $event->guests();

        return new GuestCollection($this->paginate($guests->latest()));
    }

    /**
     * Undocumented function
     *
     * @param CommonGuest $commonGuest
     * @param Request $request
     * @param User $user
     * @param Template $template
     * @param Guest $guests
     * @return void
     */
    private function saveCommonGuest(
        CommonGuest $commonGuest,
        Request $request,
        User $user,
        Template $template,
        $guests,
        Event $event
    ) {
        $qr = !!$request->can_include_qrcode;

        $datas = $this->replaceToCode(
            $qr,
            $template->text_sms,
            $template->text_mail,
            $event->hashid(),
            $commonGuest->name
        );

        $smsParsed = $this->smsCounter->count($datas['sms']);

        $guests->create([
            'user_id' => $user->id,
            'template_id' => $template->id,
            'name' => $commonGuest->name,
            'email' => $commonGuest->email,
            'phone' => $commonGuest->phone,
            'code' => $datas['radom'],
            'text_sms' => $datas['sms'],
            'text_mail' => $datas['mail'],
            'text_sms_hidden_code' => $datas['smsHidden'],
            'text_mail_hidden_code' => $datas['mailHidden'],
            'can_include_qrcode' => $qr,
            'can_send_sms' => !!$request->can_send_sms,
            'can_send_mail' => !!$request->can_send_mail,
            'sms_total' => $smsParsed->messages,
            'country_code' => $commonGuest->country_code,
            'country_call' => $commonGuest->country_call,
            'common_guest_id' => $commonGuest->id,
            'can_include_icalendar' => !!$request->icalendar
        ]);
    }



    /**
     * @param Guest $guest
     * 
     * @return void
     */
    private function dispatchGuestToQueue(Guest $guest)
    {
        ProcessInvitation::dispatch($guest)
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
     * Remove all resource from storage.
     *
     * @param  Event  $guest
     * @return \Illuminate\Http\Response
     */
    public function destroyAll(Event $event)
    {
        $guests = $event->guests();

        $guests->delete();

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
     * Send all event invitation guest use bus batch
     * 
     * @param Event $event
     * @return \Illuminate\Bus\Batch
     */
    protected function proceedBatchableInvitation(Event $event)
    {
        $eventId = $event->id;

        $guests = $event->unprocessedGuests()
            ->map(fn (Guest $guest) => new ProcessInvitation($guest))
            ->values()
            ->toArray();

        $batch = Bus::batch($guests)
            ->finally(function (Batch $batch) use ($eventId) {
                $this->deleteEventProcess($eventId);
            })->onQueue('invitation')->dispatch();

        if (!empty($guests)) {
            $this->putEventProcess($eventId, array_merge(['batch' => $batch->id], $event->status()));
        }

        return $batch;
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
            $batch = $this->proceedBatchableInvitation($event);
        }

        $processed = $event->processedGuests()->count();

        return [
            'processed' => $processed,
            'total' => $event->guests->count(),
            'batch' => isset($batch) ? $batch->id : null
        ];
    }
}
