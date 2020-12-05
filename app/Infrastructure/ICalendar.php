<?php

namespace App\Infrastructure;

use App\Models\Event\Event as EventModel;
use Carbon\Carbon;
use Spatie\IcalendarGenerator\Components\Alert;
use Spatie\IcalendarGenerator\Components\Calendar;
use Spatie\IcalendarGenerator\Components\Event;
use Spatie\IcalendarGenerator\Enums\Classification;
use Spatie\IcalendarGenerator\Enums\EventStatus;

class ICalendar
{

    /**
     * @param EventModel $event
     * 
     * @return string
     */
    public static function create(EventModel $event)
    {
        $user = $event->user;

        return Calendar::create(config('app.name', 'SiKu'))
            ->event(
                Event::create($event->name)
                    ->description($event->desciption ?: ' ')
                    ->status(EventStatus::confirmed())
                    ->classification($event->is_public ? Classification::public() : Classification::private())
                    ->alert(Alert::minutesBeforeStart(10, $event->name))
                    ->alert(Alert::minutesAfterStart(10, $event->name))
                    ->organizer($user->email, $user->name)
                    ->startsAt(Carbon::parse($event->start_time))
                    ->endsAt(Carbon::parse($event->end_time))
            )
            ->get();
    }

    /**
     * @param EventModel $event
     * 
     * @return string
     */
    public static function getRoute(EventModel $event)
    {
        return route('icalendar', ['event' => $event->hashid()]) . ", Calendar.";
    }
}
