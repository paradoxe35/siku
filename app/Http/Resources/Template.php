<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Template extends JsonResource
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
            'name' => $this->name,
            'sms' => $this->sms_total,
            'text' => [
                'sms' =>  $this->text_sms,
                'whatsapp' => $this->text_whatsapp
            ]
        ];
    }
}
