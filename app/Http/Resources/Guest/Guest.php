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
        $smsSend = $this->sendedSms();
        $whatsappSend = $this->sendedWhatsapp();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'sms' => $this->sms_total,
            'sended_sms' => $smsSend,
            'sended_whatsapp' => $whatsappSend,
            'autorized' => $this->autorized,
            'can_send_sms' => $this->can_send_sms,
            'can_send_whatsapp' => $this->can_send_whatsapp,
            'text' => [
                'sms' => $smsSend ? $this->text_sms : $this->text_sms_hidden_code,
                'whatsapp' => $whatsappSend ? $this->text_whatsapp : $this->text_whatsapp_hidden_code
            ]
        ];
    }
}
