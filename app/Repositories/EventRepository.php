<?php

namespace App\Repositories;

use App\Models\Event\Event;

class EventRepository
{
    /**
     * @var Event
     */
    public Event $event;

    /**
     * @param Event $event
     */
    public function __construct(Event $event)
    {
        $this->event = $event;
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function newQuery() {
        return $this->event->newQuery();
    }

}
