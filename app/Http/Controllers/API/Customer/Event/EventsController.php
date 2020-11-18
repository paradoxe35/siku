<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Files\Images\ImageCompression;
use App\Http\Controllers\Controller;
use App\Http\Resources\Event\Event as ResourcesEvent;
use App\Http\Resources\Event\EventCollection;
use App\Models\Event\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Illuminate\Http\File;


class EventsController extends Controller
{

    /**
     * @var array
     */
    private $start_time = ['required', 'date', 'before:end_time'];
    /**
     * @var array
     */
    private $end_time = ['required', 'date', 'after:start_date'];

    public function __construct()
    {
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
            'start_time' => $this->start_time,
            'end_time' => $this->end_time,

            'event_guest' => ['required', 'numeric', 'min:1'],
            'description' => ['nullable', 'string', 'min:2'],
            'is_public' => ['nullable']
        ]);

        abort_if(
            $user->events->count() >= 10,
            400,
            trans('Vous pouvez pas enregistrer plus :count événements', ['count' => 10])
        );

        //create customer event
        $event = $user->events()->create([
            'name' => $request->event_name,
            'event_date' => $request->start_time,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
            'desciption' => $request->description,
            'is_public' => !!$request->is_public
        ]);

        // create guest 
        $this->storeGuest($event, $request->event_guest);

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
     * @return \Illuminate\Support\Facades\Storage
     */
    private function storage()
    {
        return Storage::disk();
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

        $imageContent = base64_decode($image_array_2[1]);

        $temp_pointer = tmpfile();

        fwrite($temp_pointer, $imageContent);

        $tmpPath = stream_get_meta_data($temp_pointer)['uri'];

        // image compression
        $img->compress_image($tmpPath, null, 50, null);

        $resolved = $this->storage()->putFileAs("events/logos/$hash", new File($tmpPath), "$hash.png", 'public');

        $url = $this->storage()->url($resolved);

        $event->qrcode_logo = $url .  '?' . Str::random();

        $event->save();

        $event->refresh();

        fclose($temp_pointer);

        return ['logo_path' => $event->qrcode_logo];
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

            'start_time' => $this->start_time,
            'end_time' => $this->end_time,

            'is_public' => ['nullable']
        ]);

        //create customer event
        $event = $event->fill([
            'name' => $request->event_name,
            'event_date' => $request->start_time,
            'start_time' => $request->start_time,
            'end_time' => $request->end_time,
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
        if ($event->totalConsumeds() > 0) {
            $event->delete();
        } else {
            $event->forceDelete();
        }

        return new ResourcesEvent($event);
    }
}
