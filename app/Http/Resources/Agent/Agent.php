<?php

namespace App\Http\Resources\Agent;

use Illuminate\Http\Resources\Json\JsonResource;

class Agent extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return  [
            'name' => $this->name,
            'email' => @$this->email,
            'imageUrl' => @$this->image_url ?: "/img/default-agent-img.jpg",
            'role' => $this->role,
            'status' => $this->status ? trans('En ligne') : trans('Hors ligne'),
            'id' => $this->id,
            'created_at' => @$this->created_at ? @$this->created_at->format('Y-m-d H:i') : null,
        ];
    }
}
