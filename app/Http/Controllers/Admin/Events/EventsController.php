<?php

namespace App\Http\Controllers\Admin\Events;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommonGuest\CommonGuestCollection;
use App\Http\Resources\Guest\GuestCollection;
use App\Http\Resources\Template\TemplateCollection;
use App\Http\Resources\Validator\ValidatorCollection;
use App\Models\Event\Event;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;

class EventsController extends Controller
{

    /**
     * Admin Customers controller
     */
    public function __construct()
    {
        $this->middleware(function (Request $request, \Closure $next) {
            URL::defaults(['id' => $request->route('id')]);

            return $next($request);
        })->except('index');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function eventQuery()
    {
        return Event::query();
    }


    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return $this->eventQuery()
            ->with('user')
            ->with('guests');
    }

    /**
     * @param mixed $query
     * 
     * @return mixed
     */
    private function email($query, $email)
    {
        $user = User::query()->where('email', 'like', "%$email%")->first();
        return $user ? $query->where('user_id', $user->id) : $query;
    }

    /**
     * @param mixed $query
     * 
     * @return mixed
     */
    private function eventName($query, $email)
    {
        return $query->where('name', 'like', "%$email%");
    }


    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = $this->query()->latest();

        $active = request('active');

        if (request('email')) {
            $query = $this->email($query, request('email'));
        }

        if (request('q')) {
            $query = $this->eventName($query, request('q'));
        }

        if ($active === 'deleted') {
            $query = $query->onlyTrashed();
        } elseif ($active === 'all') {
            $query = $query->withTrashed();
        }

        $events = $query->paginate();

        return view('admin.events.home', compact('events'));
    }

    /**
     * @param int $id
     * 
     * @return Event
     */
    private function queryWithTrashed($id)
    {
        return $this->eventQuery()->withTrashed()->findOrFail($id);
    }


    /**
     * @param mixed $event
     * 
     * @return void
     */
    private function eventDep($event)
    {
        $event->templates_count = $event->templates()->count();

        $event->guests_count = $event->guests()->count();

        $event->status = $event->status();

        $event->hash = $event->hashid();

        $event->customer_route = route('admin.customers.show', ['id' => $event->user->id], false);

        $event->customer_email = $event->user->email;

        $event->validators_count = $event->validators()->count();

        $event->event_date_format = $event->event_date->format('Y-m-d H:i');

        $event->created_at_format = $event->created_at->format('Y-m-d H:i');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $event = $this->queryWithTrashed($id);

        $this->eventDep($event);

        return view('admin.events.show', ['evnt' => $event]);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function trash($id)
    {
        $event = $this->queryWithTrashed($id);

        if ($event->trashed()) {
            $event->restore();
        } else {
            $event->delete();
        }

        $event->save();

        $event->refresh();

        $this->eventDep($event);

        return [
            'event' => $event
        ];
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function templates($id)
    {
        $event = $this->queryWithTrashed($id);
        $templates = $event->templates()->where('global', false);

        if (request('filter') == 'global') {
            $templates = $event->user->templates()->where('global', true);
        }

        return new TemplateCollection($templates->get());
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function guests($id)
    {
        $event = $this->queryWithTrashed($id);
        $guests = $event->guests()->latest();

        if (request('filter') == 'global') {
            $commons = $event->user->commonGuests()->latest();
            return new CommonGuestCollection($commons->paginate());
        }

        return new GuestCollection($guests->paginate(5));
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function validators($id)
    {
        $event = $this->queryWithTrashed($id);
        $guests = $event->validators()->latest();

        return new ValidatorCollection($guests->get());
    }
}
