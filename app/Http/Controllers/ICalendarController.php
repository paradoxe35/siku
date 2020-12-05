<?php

namespace App\Http\Controllers;

use App\Infrastructure\ICalendar;
use App\Models\Event\Event;
use Illuminate\Http\Request;

class ICalendarController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Event $event)
    {
        return response(ICalendar::create($event))
            ->header('Content-Type', 'text/calendar')
            ->header('charset', 'utf-8');
    }
}
