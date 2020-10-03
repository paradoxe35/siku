<?php

namespace App\Http\Resources\Attend;

use Illuminate\Http\Resources\Json\JsonResource;

class Attend extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
