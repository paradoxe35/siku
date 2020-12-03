<?php

namespace App\Infrastructure\Send;

use App\Models\Balance\Consumed;
use App\Models\Event\Guest;
use App\Models\Event\SendHistorical;
use App\Models\Event\Validator;
use App\Models\Twilio\TwilioSms;
use Illuminate\Support\Facades\Log;

class Send
{
    /**
     * @param Guest $guest
     */
    protected function sendSms(Guest $guest, $price)
    {
        $sms = new SMS;
        $message = $sms($guest->phone, $guest->text_sms);

        $consumed = $this->saveGuestConsumed($guest, $price, 'sms');
        $this->statusCallbackTwilio($message, $consumed, $guest->id, $guest->user_id);
    }

    /**
     * @param Guest $guest
     */
    protected function sendMail(Guest $guest, $price)
    {
        $mail = new Mail;
        $mail($guest);
        $this->saveGuestConsumed($guest, $price, 'mail');
    }

    /**
     * Undocumented function
     *
     * @param array $message
     * @param Consumed $consumed
     * @param string|int $guest_id
     * @param  string  $user_id
     * @return void
     */
    protected function statusCallbackTwilio(array $message, Consumed $consumed, $guest_id, $user_id)
    {
        [$token, $imsg] = $message;

        TwilioSms::query()->create([
            'sid' => $imsg->sid,
            'status' => $imsg->status,
            'token' => $token,
            'guest_id' => $guest_id,
            'user_id' => $user_id,
            'consumed_id' => $consumed->id
        ]);
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

        if (!is_null($price) && null != $price) {
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
            'error_message' => $errMsg
        ]);

        if ($error) {
            $filled->error = $error;
        }

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

        $model->error = false;
        $model->save();

        $guest->refresh();

        if ($guest->canSendMail()) {
            $this->handle('mail', $guest, $model);
        }

        if ($guest->canSendSms()) {
            $this->handle('sms', $guest, $model);
        }

        $guest->refresh();

        return $guest;
    }

    /**
     * @param Validator $validator
     */
    public function proceedValidator(Validator $validator)
    {
        $price = $validator->priceSms();

        if (!is_null($price) && null != $price) {
            try {
                $sms = new SMS;
                $message = $sms($validator->phone, $validator->messageText());

                $consumed = $this->saveValidatorConsumed(
                    $validator,
                    $price,
                    'sms'
                );
                $this->statusCallbackTwilio($message, $consumed, null, $validator->user_id);
            } catch (\Throwable $th) {
                Log::error($th->getMessage());
            }
        }
    }

    /**
     * Undocumented function
     *
     * @param Guest $item
     * @param double $amount
     * @param string $service
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

    /**
     * Undocumented function
     *
     * @param Validator $item
     * @param double $amount
     * @param string $service
     * @return \Illuminate\Database\Eloquent\Model
     */
    protected function saveValidatorConsumed(Validator $validator, $amount, $service)
    {
        return $validator->user->consumeds()->create([
            'amount' => $amount,
            'service' => $service,
            'confirmed' => true,
            'event_id' => $validator->event->id
        ]);
    }
}
