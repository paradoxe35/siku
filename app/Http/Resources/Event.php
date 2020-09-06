<?php

namespace App\Http\Resources;

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
        $user = $request->user();
        $p = $this->presumedPrice($user->country_code);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'route' => $this->route(),
            'price' => $p['prices'],
            'active' => $this->active,
            'hash' => $this->hashid(),
            'guests' => $p['guests'],
            'event_date' => $this->event_date->format('Y-m-d H:i'),
            'created_at' => $this->created_at->format('Y-m-d H:i')
        ];
    }
}
