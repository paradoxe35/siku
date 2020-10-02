<?php

namespace App\Http\Resources\Guest;

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
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'sms' => $this->sms_total,
            'sended_sms' => $this->sendedSms(),
            'sended_whatsapp' => $this->sendedWhatsapp(),
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
