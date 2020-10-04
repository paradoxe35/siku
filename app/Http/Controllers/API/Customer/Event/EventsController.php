<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Files\Images\ImageCompression;
use App\Http\Controllers\Controller;
use App\Http\Resources\Event\Event as ResourcesEvent;
use App\Http\Resources\Event\EventCollection;
use App\Models\DefaultBalance;
use App\Models\Event\Event;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class EventsController extends Controller
{

    /**
     * @var EventRepository
     */
    private EventRepository $event;

    /**
     * @param EventRepository $event
     */
    public function __construct(EventRepository $event)
    {
        $this->event = $event;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $events = $user->events()->latest()->paginate(3);

        $events->withPath(route('api.customer.events.index', [], false));

        return new EventCollection($events);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $request->validate([
            'event_name' => [
                'required', 'string', 'min:2', 'max:50',
                Rule::unique('events', 'name')->where(function ($query) use ($user) {
                    return $query->where('user_id', $user->id);
                })
            ],
            'event_date' => ['required', 'date'],
            'event_guest' => ['required', 'numeric', 'min:1'],
            'description' => ['required', 'string', 'min:2'],
            'is_public' => ['nullable']
        ]);

        //create customer event
        $event = $user->events()->create([
            'name' => $request->event_name,
            'event_date' => $request->event_date,
            'desciption' => $request->description,
            'is_public' => !!$request->is_public
        ]);

        // create guest 
        $this->storeGuest($event, $request->event_guest);

        //set default balance
        $this->setDefaultBalance($event);

        $event->refresh();

        return new ResourcesEvent($event);
    }

    /**
     * @param static $event
     * @param int $event_guest
     * 
     * @return mixed
     */
    private function storeGuest($event, $event_guest)
    {
        return $event->eventGuests()->create([
            'guest' => $event_guest
        ]);
    }


    /**
     * @param mixed $event
     * 
     * @return mixed
     */
    private function setDefaultBalance($event)
    {
        // get default balance from db
        $default = DefaultBalance::query()->firstWhere('active', true);
        if ($default) {
            // stpre default
            return $event->allBalance()->create([
                'confirmed' => true,
                'token' => Str::random(),
                'amount' => $default->balance
            ]);
        }

        return null;
    }

    /**
     * @return mixed
     */
    private function storage()
    {
        return Storage::disk('public');
    }

    /**
     * set qr logo.
     *
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function setQcodeLogo(Request $request, Event $event, ImageCompression $img)
    {
        $request->validate([
            'data_url' => ['required', 'string']
        ]);

        $hash = $event->hashid();

        // formate data url to image format
        $image_array_1 = explode(";", $request->data_url);

        $image_array_2 = explode(",", $image_array_1[1]);

        $image = base64_decode($image_array_2[1]);

        $path = "events/logos/$hash/$hash.png";

        $this->storage()->put($path, $image);

        $filesource  = storage_path('app/public/' . $path);

        // image compression
        $img->compress_image($filesource, null, 50, null);

        $event->qrcode_logo = $path;

        $event->save();

        $event->refresh();

        return ['logo_path' => ('/' . $event->qrcode_logo . '?' . Str::random())];
    }


    /**
     * get status of event in queue processing
     *
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function inQueueProcess(Event $event)
    {
        return [
            'status' => $event->InQueueProcessData()
        ];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        return new ResourcesEvent($event);
    }


    /**
     * change the specified resource in storage.
     * 
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    private function change(Event $event)
    {
        $event->active = !$event->active;
        $event->save();
        $event->refresh();
        return new ResourcesEvent($event);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        if ($request->isMethod('PATCH')) {
            return $this->change($event);
        }

        $user = $request->user();

        $request->validate([
            'event_name' => [
                'required', 'string', 'min:2', 'max:50',
                Rule::unique('events', 'name')->where(function ($query) use ($user) {
                    return $query->where('user_id', $user->id);
                })->ignore($event->id)
            ],
            'event_date' => ['required', 'date'],
            'is_public' => ['nullable']
        ]);

        //create customer event
        $event = $event->fill([
            'name' => $request->event_name,
            'event_date' => $request->event_date,
            'is_public' => !!$request->is_public
        ]);

        $event->save();

        $event->refresh();

        return new ResourcesEvent($event);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        $event->delete();
        return new ResourcesEvent($event);
    }
}
