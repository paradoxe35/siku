<?php

namespace App\Http\Controllers\Webhooks\Twilio;

use App\Events\UserBalance;
use App\Http\Controllers\Controller;
use App\Infrastructure\BasePrice;
use App\Models\Balance\Consumed;
use App\Models\Event\SendHistorical;
use App\Models\Twilio\TwilioSms;
use App\Services\Twilio\TwilioClient;
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
        $model = $this->query()
            ->where('token', $token)
            ->where('sid', $request->get('SmsSid'))
            ->first();

        if (!$model) {
            ddd();
        }

        try {
            switch ($request->get('SmsStatus')) {
                case 'delivered':
                    $this->delivered($model, 'delivered');
                    break;
                case 'send':
                    $this->delivered($model, 'send');
                    break;
                case 'failed':
                    $this->failed($model, 'failed');
                    break;
                case 'undelivered':
                    $this->failed($model, 'undelivered');
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
     * @param string $status
     * 
     * @return void
     */
    private function delivered(TwilioSms $model, string $status)
    {
        $message = $this->getMessage($model->sid);

        $price = $message->price;
        if ($price && is_numeric($price)) {

            $this->updateConsumedPrice(abs($price), $model->consumed);
        }

        $this->updateModelStatus($model, $message, $status);

        if ($model->guest) {
            $this->updateGuestHistorical($model->guest->historical, null);
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
     * @param Consumed $consumed
     * 
     * @return void
     */
    private function updateConsumedPrice($price, Consumed $consumed)
    {
        $finalPrice = (BasePrice::getAmountSms() + $price);

        $consumed->fill(['amount' => $finalPrice, 'confirmed' => true])->save();

        event(new UserBalance($consumed->user));
    }

    /**
     * @param TwilioSms $model
     * @param string $status
     * 
     * @return void
     */
    private function failed(TwilioSms $model, string $status)
    {
        $message = $this->getMessage($model->sid);

        $this->updateModelStatus($model, $message, $status);

        if ($model->guest) {
            $this->updateGuestHistorical(
                $model->guest->historical,
                $message->errorMessage ?: "Error"
            );
        }

        $model->consumed->fill(['confirmed' => false])->save();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return TwilioSms::query();
    }
}
