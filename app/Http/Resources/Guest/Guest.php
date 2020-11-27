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
        $mailSend = $this->sendedMail();

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'sms' => $this->sms_total,
            'sended_sms' => $smsSend,
            'sended_mail' => $mailSend,
            'autorized' => $this->autorized,
            'can_send_sms' =>  $this->canSendSms(),
            'can_send_mail' => $this->canSendMail(),
            'text' => [
                'sms' => $smsSend ? $this->text_sms : $this->text_sms_hidden_code,
                'mail' => $mailSend ? $this->text_mail : $this->text_mail_hidden_code
            ]
        ];
    }
}
