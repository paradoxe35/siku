<?php

namespace App\Infrastructure\Send;

use App\Models\Balance\Consumed;
use App\Models\Event\Guest;
use App\Models\Event\SendHistorical;
use App\Models\Event\Validator;
use App\Models\Twilio\TwilioSms;
use App\User;
use Illuminate\Support\Facades\Log;

class Send
{
    /**
     * @param Guest $guest
     */
    protected function sendSms(Guest $guest, $price, string $service)
    {
        $sms = new SMS;
        $message = $sms($guest->phone, $guest->text_sms);

        if ($guest->user->itWorkingOnDefaultBalance()) {
            $this->saveGuestConsumedDefaultBalance($guest->user, $price, $service);
        } else {
            $consumed = $this->saveGuestConsumed($guest, $price, $service);
        }

        $this->statusCallbackTwilio(
            $message,
            $consumed ?? null,
            $guest->id,
            $guest->user_id,
            $guest->sms_total
        );
    }

    /**
     * @param Guest $guest
     */
    protected function sendMail(Guest $guest, $price, string $service)
    {
        $mail = new Mail;
        $mail($guest);

        if ($guest->user->itWorkingOnDefaultBalance()) {
            $this->saveGuestConsumedDefaultBalance($guest->user, $price, $service);
        } else {
            $this->saveGuestConsumed($guest, $price, $service);
        }
    }

    /**
     * Undocumented function
     *
     * @param array $message
     * @param Consumed|null $consumed
     * @param string|int $guest_id
     * @param  string  $user_id
     * @param  int  $sms_total
     * @return void
     */
    protected function statusCallbackTwilio(array $message, ?Consumed $consumed, $guest_id, $user_id, $sms_total)
    {
        [$token, $imsg] = $message;

        TwilioSms::query()->create([
            'sid' => $imsg->sid,
            'status' => $imsg->status,
            'token' => $token,
            'guest_id' => $guest_id,
            'user_id' => $user_id,
            'consumed_id' => $consumed ? $consumed->id : null,
            'messages_count' => $sms_total
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
                $this->$send($guest, $price, $service);
            } catch (\Throwable $th) {

                $error = true;
                $errMsg = $th->getMessage();
            }
        } else {
            $error = true;
            $errMsg = "Low Balance";
        }

        $filled = $historical->fill([
            'sended_' . $service => !$error
        ]);

        if ($error) {
            $filled->error = $error;
            $filled->error_message = $errMsg;
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
                $service = 'sms';

                if ($validator->user->itWorkingOnDefaultBalance()) {
                    $this->saveGuestConsumedDefaultBalance($validator->user, $price, $service);
                } else {
                    $consumed = $this->saveValidatorConsumed(
                        $validator,
                        $price,
                        $service
                    );
                }

                $this->statusCallbackTwilio(
                    $message,
                    $consumed ?? null,
                    null,
                    $validator->user_id,
                    $validator->smsTotal()
                );
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
     * @param User $user
     * @param mixed $amount
     * @param string $service
     * 
     * @return void
     */
    protected function saveGuestConsumedDefaultBalance(User $user, $amount, string $service)
    {
        $balance = $user->defaultBalance;
        if ($balance) {
            $total = $balance->$service;

            $user->defaultBalance->$service = $total - $amount;

            $user->defaultBalance->save();
        }
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
