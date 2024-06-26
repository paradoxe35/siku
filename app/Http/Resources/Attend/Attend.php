<?php

namespace App\Http\Resources\Attend;

use App\Http\Resources\Guest\Guest;
use App\Http\Resources\Validator\Validator;
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
        return [
            'id' => $this->id,
            'guest' => new Guest($this->guest),
            'validator' => new Validator($this->validator),
            'created_at' => $this->created_at->format('Y-m-d H:i')
        ];
    }
}
