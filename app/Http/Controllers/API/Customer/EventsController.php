<?php

namespace App\Http\Controllers\API\Customer;

use App\Http\Controllers\Controller;
use App\Http\Resources\Event as ResourcesEvent;
use App\Http\Resources\EventCollection;
use App\Models\DefaultBalance;
use App\Models\Event\Event;
use App\Repositories\EventRepository;
use Illuminate\Http\Request;
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
    public function index()
    {
        return new EventCollection($this->event->newQuery()->paginate(3));
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
                'required', 'string', 'min:2', 'max:255',
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
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        //
    }
}
