<?php

namespace App\Http\Resources\Admin\Customer\Event;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerEvent extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request), [
            'event_date' => $this->event_date->format('Y-m-d H:i'),
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'guests' => $this->guests()->count(),
            'hash' => $this->hashid(),
            'route' => route('admin.events.show', ['id' => $this->id], false)
        ]);
    }
}
