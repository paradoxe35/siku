<?php

namespace App\Http\Controllers\Webhooks\Twilio;

use App\Events\UserBalance;
use App\Http\Controllers\Controller;
use App\Infrastructure\BasePrice;
use App\Models\Balance\Consumed;
use App\Models\Event\SendHistorical;
use App\Models\Twilio\TwilioSms;
use App\Services\Twilio\TwilioClient;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class StatusCallbackController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request, $token)
    {
        $this->handle($token, $request->get('SmsSid'), $request->get('SmsStatus'));

        return response();
    }

    /**
     * @param string $token
     * @param string $smsSid
     * @param string $smsStatus
     * 
     * @return void
     */
    public function handle(string $token, string $smsSid, string $smsStatus, bool $shoudCheckQueued = false)
    {
        $model = $this->query()
            ->where('token', $token)
            ->where('sid', $smsSid)
            ->first();

        if (!$model) {
            ddd();
        }

        try {
            switch ($smsStatus) {
                case 'delivered':
                    $this->delivered($model);
                    break;
                case 'send':
                    $this->delivered($model);
                    break;
                case 'queued':
                    if ($shoudCheckQueued) {
                        $this->queued($model);
                    }
                    break;
                case 'failed':
                    $this->failed($model);
                    break;
                case 'undelivered':
                    $this->failed($model);
                    break;
            }
        } catch (\Throwable $th) {
            Log::error($th->getMessage());
        }
    }

    /**
     * @param string $sid
     */
    private function getMessage(string $sid)
    {
        $client = (new TwilioClient)->client();
        return $client->messages($sid)->fetch();
    }

    /**
     * @param TwilioSms $model
     * 
     * @return void
     */
    private function delivered(TwilioSms $model)
    {
        $message = $this->getMessage($model->sid);

        $price = $message->price;

        $this->updateModelStatus($model, $message, $message->status);

        if ($model->guest) {
            $this->updateGuestHistorical($model->guest->historical, null);
        }

        if ($price && is_numeric($price)) {

            $this->updateConsumedPrice(abs($price), $model);
        }
    }

    /**
     * @param TwilioSms $model
     * 
     * @return void
     */
    private function queued(TwilioSms $model)
    {
        $message = $this->getMessage($model->sid);

        $this->handle($model->token, $model->sid, $message->status);
    }

    /**
     * @param TwilioSms $model
     * 
     * @return void
     */
    private function failed(TwilioSms $model)
    {
        $message = $this->getMessage($model->sid);

        $this->updateModelStatus($model, $message, $message->status);

        if ($model->guest) {
            $this->updateGuestHistorical(
                $model->guest->historical,
                $message->errorMessage ?: "Error"
            );
        }

        if ($model->consumed) {
            $model->consumed->fill(['confirmed' => false])->save();
        }
    }


    /**
     * @param TwilioSms $model
     * @param mixed $message
     * @param string $status
     * 
     * @return void
     */
    private function updateModelStatus(TwilioSms $model, $message, string $status)
    {
        $model->fill([
            'status' => $status,
            'data' => json_encode($message->toArray() ?: []),
            'price' => $message->price,
            'consumed' => $status === 'delivered'
        ])->save();
    }


    /**
     * @param SendHistorical $model
     * @param string|null $error
     * @return void
     */
    private function updateGuestHistorical(SendHistorical $model, ?string $error)
    {
        $model->fill([
            'sended_sms' => is_null($error),
            'error' => !is_null($error),
            'error_message' => $error
        ])->save();
    }

    /**
     * @param float $price
     * @param TwilioSms $consumed
     * 
     * @return void
     */
    private function updateConsumedPrice($price, TwilioSms $model)
    {
        $consumed = $model->consumed;

        $user = $model->user;

        if (!$consumed) {
            event(new UserBalance($user));
            return null;
        }

        $finalPrice = ((BasePrice::getAmountSms() * $model->messages_count) + $price);

        if (doubleval($consumed->amount) < $finalPrice) {
            $consumed->fill(['amount' => $finalPrice, 'confirmed' => true])->save();
        }

        event(new UserBalance($user));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return TwilioSms::query();
    }
}
