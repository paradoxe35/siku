<?php

namespace App\Http\Controllers\API\Customer\Payments;

use App\Http\Controllers\Controller;
use App\Infrastructure\BasePrice;
use App\Infrastructure\Cache\CacheUserDataPay;
use App\Infrastructure\Payments\PayPal\CaptureIntent\CreateOrder;
use App\Infrastructure\Payments\PayPal\GetOrder;
use App\Infrastructure\Payments\Services;
use App\Infrastructure\Vars\EmailApp;
use App\Infrastructure\Vars\TelegramApp;
use App\Models\Event\Event;
use App\Notifications\Payment\InvoicePaid;
use App\Notifications\Payment\UserPay;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class PaymentsController extends Controller
{
    use CacheUserDataPay;

    /**
     * @var array
     */
    private $guestRule = ['required', 'numeric',  'min:60', 'max:100000'];


    /**
     * @var array
     */
    private $amountRule = ['required', 'numeric',  'min:0.001'];

    /**
     * @return \Illuminate\Http\Response
     */
    public function customerPaymentLinkPage()
    {
        $eventId = request()->query('event_id');
        return [
            'link' => route('customer.event.payments.new', ['event' => $eventId], false)
        ];
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function customPaymentValidate(Request $request, Event $event)
    {
        $request->validate([
            'payment_code' => ['required', 'string'],
            'guests' => $this->guestRule,
            'amount' => $this->amountRule
        ]);

        $code = $request->payment_code;

        /**
         * @var \App\User
         */
        $user = $request->user();

        //validate payment code
        $customPay = $user->customPayment()->firstWhere('payment_code', $code);

        // raising if not match code
        if (!$customPay || !$customPay->active) {
            abort(404, trans('Votre code paiement est invalid'));
            exit;
        }

        // check it doen't already exist
        $inBalance = $user->AllBalance()->firstWhere('custom_payment_id', $customPay->id);

        // exist code in customer event balance
        if ($inBalance) {
            abort(400, trans("Le code utilisé n'est plus actif"));
            exit;
        }

        /**
         * store in balance in user related
         * @var \App\Models\Balance\Balance
         */
        $balance = $user->AllBalance()->create([
            'event_id' => $event->id,
            'token' => $code,
            'confirmed' => true,
            'amount' => $customPay->amount,
            'custom_payment_id' => $customPay->id,
            'guests' => $customPay->guests
        ]);

        //store payment meta as reference
        $this->storePaymentMeta(
            $balance,
            $request->guests,
            $request->amount,
            BasePrice::$currency_code,
            Services::$customPayment
        );

        $user->refresh();

        return [
            'new_balance' => $user->balance(),
            'confirmed' => true
        ];
    }

    /**
     * @param \App\Models\Payments\PaymentMeta $payMeta
     * 
     * @return static
     */
    private function notify($payMeta)
    {
        /** @var \App\User */
        $user = request()->user();

        Notification::route('telegram', TelegramApp::getAppGroupChatId())
            ->route('mail', EmailApp::getAppEmailAddress())
            ->notify(new UserPay($user, $payMeta));


        if ($user->email_verified_at) {
            $user->notify(new InvoicePaid($payMeta));
        }
    }

    /**
     * @param \App\Models\Balance $balance
     * @param int $guests
     * @param double $amount
     * @param string $currency_code
     * @param string $service
     * @param json $datas
     * @return static
     */
    private function storePaymentMeta($balance, $guests, $amount, $currency_code, $service, $datas = null)
    {

        //store payment meta as reference
        $payMeta = $balance->paymentMeta()->create([
            'guests' => $guests,
            'amount' => $amount,
            'currency_code' => $currency_code,
            'service' => $service,
            'datas' => $datas
        ]);

        $this->notify($payMeta);

        return $payMeta;
    }


    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function payData(Request $request, $event)
    {
        $data = $request->validate([
            'guests' => $this->guestRule,
            'price' => $this->amountRule
        ]);
        $data['price'] = round($data['price'], 2);

        $request->session()->put('pay-data', $data);
        $this->putUserDataPay($request->user()->id, $data);

        return [
            'redirect_url' => route('customer.event.payments.new.pay', ['event' => $event], false)
        ];
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response|\PayPalHttp\HttpResponse
     */
    public function createPaypalTransaction(Request $request)
    {

        $request->validate([
            'amount' => ['required'],
            'return_url' => ['required'],
            'cancel_url' => ['required'],
        ]);

        $response = CreateOrder::createOrder(
            $request->return_url,
            $request->cancel_url,
            $request->amount
        );

        return (array) $response->result;
    }


    /**
     * @param mixed $result
     * @param \App\User $auth
     * @param int $event_id
     * @return void
     */
    public function completedPayPalTransaction($result, $auth, $event_id, $guests)
    {
        $amount = $result->purchase_units[0]->amount->value;
        $currency_code = $result->purchase_units[0]->amount->currency_code;

        /**
         * store in balance in user related
         * @var \App\Models\Balance\Balance
         */
        $balance = $auth->AllBalance()->create([
            'event_id' => $event_id,
            'confirmed' => true,
            'amount' => $amount,
            'guests' => $guests
        ]);

        //store payment meta as reference
        $this->storePaymentMeta(
            $balance,
            $guests,
            $amount,
            $currency_code,
            Services::$paypal,
            json_encode($result)
        );
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getPaypalTransaction(Request $request, Event $event)
    {
        $auth = $request->user();

        $event_id = $event->id;

        $request->validate([
            'orderID' => ['required'],
            'guests' => ['required'],
        ]);

        $guests = $request->guests;

        $response =  GetOrder::getOrder(
            $request->orderID,
            $guests,
            function ($result) use ($guests, $auth, $event_id) {
                $this->completedPayPalTransaction($result, $auth, $event_id, $guests);
            }
        );

        return (array) $response->result;
    }
}
