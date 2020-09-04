<?php

namespace App\Http\Controllers\API\Customer\Payments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PaymentsController extends Controller
{

    /**
     * @return \Illuminate\Http\Response
     */
    public function customerPaymentLinkPage()
    {
        $eventId = request()->query('event_id');
        return [
            'link' => route('customer.event.payments', ['event' => $eventId], false)
        ];
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function customPaymentValidate(Request $request)
    {
        $request->validate([
            'payment_code' => ['required', 'string']
        ]);
        $eventId = $request->query('event_id');

        $code = $request->payment_code;

        $user = $request->user();
        //get event instance

        $event = $user->events()->findByHashidOrFail($eventId);

        //validate payment code
        $customPay = $event->customPayment()->firstWhere('payment_code', $code);

        // raising if not match code
        if (!$customPay || !$customPay->active) abort(404, trans('Votre code paiement est invalid'));

        // check it doen't already exist
        $inBalance = $event->AllBalance()->firstWhere('custom_payment_id', $customPay->id);

        // exist code in customer event balance
        if ($inBalance) abort(400, trans("Le code utilisé n'est plus actif"));

        // store in balance
        $event->AllBalance()->create([
            'token' => $code,
            'confirmed' => true,
            'amount' => $customPay->amount,
            'custom_payment_id' => $customPay->id
        ]);

        $event->refresh();

        return [
            'new_balance' => $event->balance(),
            'confirmed' => true
        ];
    }
}
