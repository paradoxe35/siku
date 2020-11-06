<?php

namespace App\Infrastructure\Send;

use App\Models\Event\Guest;
use App\Models\Event\SendHistorical;
use App\Models\Event\Validator;

/**
 * [Description Send]
 */
class Send
{

    /**
     * @param Guest $guest
     */
    protected function sendSms(Guest $guest, $price)
    {
        $this->saveGuestConsumed($guest, $price, 'sms');
    }

    /**
     * @param Guest $guest
     */
    protected function sendWhatsapp(Guest $guest, $price)
    {
        $this->saveGuestConsumed($guest, $price, 'whatsapp');
    }

    /**
     * @param Guest $guest
     * @param SendHistorical $historical
     */
    protected function sms(Guest $guest, SendHistorical $historical)
    {
        if ($guest->sendedSms()) {
            return true;
        }

        $error = false;

        $price = $guest->validateSmsPrice();

        if (!is_null($price)) {
            try {
                $this->sendSms($guest, $price);
            } catch (\Throwable $th) {
                $error = true;
            }
        } else {
            $error = true;
        }

        $filled = $historical->fill([
            'sended_sms' => !$error,
            'error' => $error
        ]);

        $filled->save();
    }

    /**
     * @param Guest $guest
     * @param SendHistorical $historical
     */
    protected function whatsapp(Guest $guest, SendHistorical $historical)
    {
        if ($guest->sendedWhatsapp()) {
            return true;
        }

        $error = false;

        $price = $guest->validateWhatsappPrice();

        if (!is_null($price)) {
            try {
                $this->sendWhatsapp($guest, $price);
            } catch (\Throwable $th) {
                $error = true;
            }
        } else {
            $error = true;
        }

        $filled = $historical->fill([
            'sended_whatsapp' => !$error,
            'error' => $error
        ]);

        $filled->save();
    }


    /**
     * @param Guest $guest
     */
    public function proceed(Guest $guest)
    {
        /**
         * @var \Illuminate\Database\Eloquent\Model
         */
        $model = $guest->historical;
        if (!$model) {
            $model = $guest->historical()->create([
                'user_id' => $guest->user_id,
                'event_id' => $guest->event_id
            ]);
        }

        $guest->refresh();

        if ($guest->can_send_sms) {
            $this->sms($guest, $model);
        }

        if ($guest->can_send_whatsapp) {
            $this->whatsapp($guest, $model);
        }

        $guest->refresh();

        return $guest;
    }

    /**
     * @param Validator $item
     */
    public function proceedValidator(Validator $item)
    {
    }

    /**
     * @param Guest $item
     * 
     * @return void
     */
    protected function saveGuestConsumed(Guest $item, $amount, $service)
    {
        $item->consumeds()->create([
            'amount' => $amount,
            'service' => $service,
            'confirmed' => true,
            'user_id' => $item->user->id,
            'event_id' => $item->event->id
        ]);
    }
}
