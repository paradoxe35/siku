<?php

namespace App\Http\Resources\Validator;

use Illuminate\Http\Resources\Json\JsonResource;

class Validator extends JsonResource
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
            'username' => $this->username,
            'name' => $this->name,
            'phone' => $this->phone,
            'sended_sms' => $this->sended_sms
        ];
    }
}
