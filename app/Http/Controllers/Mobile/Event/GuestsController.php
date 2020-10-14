<?php

namespace App\Http\Controllers\Mobile\Event;

use App\Http\Controllers\API\Customer\Event\EventReportController;
use App\Http\Controllers\Controller;
use App\Http\Resources\Attend\AttendCollection;
use App\Http\Resources\Guest\GuestCollection;
use App\Models\Event\Event;
use Illuminate\Http\Request;

class GuestsController extends Controller
{

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param int $per
     * 
     * @return \Illuminate\Contracts\Pagination\Paginator
     */
    private function paginate($query, $per = 20)
    {
        return $query->simplePaginate($per);
    }

    /**
     * Handle the incoming request.
     *
     * @param Request $request
     * @param Event $event
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Event $event)
    {
        $guests = $event->guests()->latest();
        return new GuestCollection($this->paginate($guests));
    }


    /**
     * @param Event $event
     * 
     * @return \Illuminate\Http\Response
     */
    public function attends(Event $event)
    {
        $attends = EventReportController::queryAttended($event);

        return new AttendCollection($this->paginate($attends));
    }
}
