<?php

namespace App\Http\Resources\Event;

use Illuminate\Http\Resources\Json\JsonResource;

class Event extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $user = null;

        if (!is_null($request)) {
            $h = $request->getPathInfo() == route('api.customer.events.index', [], false);

            if (!$h) {
                $user = $request->user();
            }
        }

        $p = $this->presumedPrice($user ? $user->country_code : null, !!$user);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'route' => $this->route(),
            'price' => $p['prices'],
            'active' => $this->active,
            'hash' => $this->hashid(),
            'guests' => $p['guests'],
            'is_public' => $this->is_public,
            'event_date' => $this->formate($this->event_date),
            'start_time' => $this->formate($this->start_time),
            'end_time' => $this->formate($this->end_time),
            'created_at' => $this->formate($this->created_at),
        ];
    }

    /**
     * @param \Datetime $date
     * 
     * @return \Datetime
     */
    private function formate($date)
    {
        return $date->format('Y-m-d H:i');
    }
}
