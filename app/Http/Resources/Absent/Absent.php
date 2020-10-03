<?php

namespace App\Http\Resources\Absent;

use App\Http\Resources\Guest\Guest;
use Illuminate\Http\Resources\Json\JsonResource;

class Absent extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'guest' => new Guest($this),
        ];
    }
}
