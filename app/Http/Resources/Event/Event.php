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

        $h = $request->getPathInfo() == route('api.customer.events.index', [], false);
        
        if (!is_null($request) && !$h) {
            $user = $request->user();
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
            'event_date' => $this->event_date->format('Y-m-d H:i'),
            'created_at' => $this->created_at->format('Y-m-d H:i')
        ];
    }
}
