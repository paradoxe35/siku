<?php

namespace App\Infrastructure\Send;

use App\Models\Event\Guest;
use App\Models\Event\SendHistorical;
use App\Models\Event\Validator;

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
    protected function sendMail(Guest $guest, $price)
    {
        $this->saveGuestConsumed($guest, $price, 'mail');
    }

    /**
     * @param string $service
     * @param Guest $guest
     * @param SendHistorical $historical
     * 
     * @return void
     */
    private function handle(string $service, Guest $guest, SendHistorical $historical)
    {
        $service = strtolower($service);

        $ucf = ucfirst($service);

        $sended = 'sended' . $ucf;
        if ($guest->$sended()) {
            return true;
        }

        $error = false;
        $errMsg = null;

        $validate = 'validate' . $ucf . 'Price';
        $price = $guest->$validate();

        if (!is_null($price)) {
            try {

                $send = 'send' . $ucf;
                $this->$send($guest, $price);
            } catch (\Throwable $th) {

                $error = true;
                $errMsg = $th->getMessage();
            }
        } else {
            $error = true;
        }

        $filled = $historical->fill([
            'sended_' . $service => !$error,
            'error' => $error,
            'error_message' => $errMsg
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
            $this->handle('sms', $guest, $model);
        }

        if ($guest->can_send_mail) {
            $this->handle('mail', $guest, $model);
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
     * @return \Illuminate\Database\Eloquent\Model
     */
    protected function saveGuestConsumed(Guest $item, $amount, $service)
    {
        return $item->consumeds()->create([
            'amount' => $amount,
            'service' => $service,
            'confirmed' => true,
            'user_id' => $item->user->id,
            'event_id' => $item->event->id
        ]);
    }
}
