<?php

namespace App\Http\Controllers\API\Customer\Payments;

use App\Http\Controllers\Controller;
use App\Infrastructure\Cache\CacheUserDataPay;
use App\Infrastructure\Payments\PayPal\CaptureIntent\CreateOrder;
use App\Infrastructure\Payments\PayPal\Client\GetOrder;
use Illuminate\Http\Request;

class PaymentsController extends Controller
{
    use CacheUserDataPay;

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
    public function customPaymentValidate(Request $request, $event)
    {
        $request->validate([
            'payment_code' => ['required', 'string'],
            'guests' => ['required', 'numeric',  'min:10', 'max:100000'],
            'amount' => ['required', 'numeric',  'min:0.001']
        ]);

        $code = $request->payment_code;

        $user = $request->user();

        //validate payment code
        $customPay = $user->customPayment()->firstWhere('payment_code', $code);

        // raising if not match code
        if (!$customPay || !$customPay->active) abort(404, trans('Votre code paiement est invalid'));

        // check it doen't already exist
        $inBalance = $user->AllBalance()->firstWhere('custom_payment_id', $customPay->id);

        // exist code in customer event balance
        if ($inBalance) abort(400, trans("Le code utilisé n'est plus actif"));
        exit;
        // store in balance in user related
        $user->AllBalance()->create([
            'event_id' => $event->id,
            'token' => $code,
            'confirmed' => true,
            'amount' => $customPay->amount,
            'custom_payment_id' => $customPay->id,
            'guests' => $request->guests,
            'presumed_amount' => $request->amount,
        ]);

        $user->refresh();

        return [
            'new_balance' => $user->balance(),
            'confirmed' => true
        ];
    }


    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function payData(Request $request, $event)
    {
        $data = $request->validate([
            'guests' => ['required', 'numeric',  'min:10', 'max:100000'],
            'price' => ['required', 'numeric',  'min:0.001']
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
     * @param array|string $result
     * @return void
     */
    public function completedPayPalTransaction($result, $guests)
    {
        // 4. Save the transaction in your database. Implement logic to save transaction to your database for future reference.
        // print "Gross Amount: 
        // {$response->result->purchase_units[0]->amount->currency_code} {$response->result->purchase_units[0]->amount->value}\n";
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function getPaypalTransaction(Request $request)
    {
        $auth = $request->user();

        $request->validate([
            'orderID' => ['required'],
            'guests' => ['required'],
        ]);

        $guests = $request->guests;

        $response =  GetOrder::getOrder(
            $request->orderID,
            $guests,
            function ($result) use ($guests) {
                $this->completedPayPalTransaction($result, $guests);
            }
        );

        return (array) $response->result;
    }
}
