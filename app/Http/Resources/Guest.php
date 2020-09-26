<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Guest extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        $h = $this->historical;
        return [
            'id' => $this->id,
            'name' => $this->name,
            'sms' => $this->sms_total,
            'sended_sms' => $h ? $h->sended_sms : false,
            'sended_whatsapp' => $h ? $h->sended_whatsapp : false,
            'autorized' => $this->autorized,
            'can_send_sms' => $this->can_send_sms,
            'can_send_whatsapp' => $this->can_send_whatsapp,
            'text' => [
                'sms' =>  $this->text_sms,
                'whatsapp' => $this->text_whatsapp
            ]
        ];
    }
}
