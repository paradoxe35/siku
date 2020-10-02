<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\Guest\GuestCollection;
use App\Models\Event\Event;
use Illuminate\Http\Request;
use Illuminate\Pagination\LengthAwarePaginator;

class EventProfileController extends Controller
{
    /**
     * @param Event $event
     * 
     * @return \Illuminate\Http\Response
     */
    public function profile(Event $event)
    {
        $send = $event->processedGuests()->count();
        $unprocessed = $event->unprocessedGuests(true);

        $wait = $unprocessed->wait->count();

        $fail =  $unprocessed->fail->count();

        return [
            "send" => $send,
            "fail" => $fail,
            "wait" => $wait
        ];
    }

    /**
     * @param Event $event
     * 
     * @return \Illuminate\Http\Response
     */
    public function profileItems(Event $event)
    {
        $filter = request('filter');

        /** @var Illuminate\Support\Collection */
        $collection = null;

        switch ($filter) {
            case 'send':
                $send = $event->processedGuests();
                $collection = $send;
                break;
            case 'wait':
                $unprocessed = $event->unprocessedGuests(true);
                $collection = $unprocessed->wait;
                break;
            case 'fail':
                $unprocessed = $event->unprocessedGuests(true);
                $collection = $unprocessed->fail;
                break;
            default:
                abort(400);
                break;
        }
        
        $paginate = new LengthAwarePaginator($collection->values(), $collection->count(), 12);

        return new GuestCollection($paginate);
    }
}
