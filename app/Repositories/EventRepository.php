<?php

namespace App\Repositories;

use App\Models\Event\Event;

class EventRepository
{
    /**
     * @var Event
     */
    private Event $event;

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
    private function newQuery() {
        return $this->event->newQuery();
    }

    public function getEvents() {
        $this->newQuery();
    }    
}
