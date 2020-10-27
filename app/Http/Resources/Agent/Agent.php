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
            'imageUrl' => $this->image,
            'role' => $this->role,
            'status' => $this->status,
            'id' => $this->id
        ];
    }
}
