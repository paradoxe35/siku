<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use App\Infrastructure\Cache\CacheUserDataPay;
use App\Models\Payments\CustomPayment;
use App\Notifications\Payment\CustomPaymentNotify;
use App\User;
use Illuminate\Http\Request;

class CustomPaymentController extends Controller
{
    use CacheUserDataPay;

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return CustomPayment::query()
            ->with('user')
            ->with('balance');
    }

    /**
     * @param int $id
     * 
     * @return \App\Models\Payments\CustomPayment
     */
    private function queryPayment($id)
    {
        return $this->query()->findOrFail($id);
    }

    /**
     * @param mixed $query
     * 
     * @return mixed
     */
    private function email($query, $email)
    {
        $user = User::query()->where('email', 'like', "%$email%")->first();
        return $user ? $query->where('user_id', $user->id) : $query;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $query = $this->query()->latest();

        $active = request('authorized');

        if (request('email')) {
            $query = $this->email($query, request('email'));
        }

        if ($active === 'unauthorized') {
            $query = $query->where('active', false);
        } else {
            $query = $query->where('active', true);
        }

        $payments = $query->paginate();

        return view('admin.price-balance.custom-payment', ['payments' => $payments]);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function searchClient()
    {
        $search = request('search');

        /** @var \Illuminate\Support\Collection */
        $clients = User::query()->where('email', 'like', "%{$search}%")->limit(10)->get();

        return $clients->map(function (User $client) {

            $data = [
                'id' => $client->id,
                'email' => $client->email,
                'name' => $client->name,
                'country' => $client->country_name . "({$client->country_code})",
                'balance' => $client->balance(),
                'hash' => $client->hashId(),
                'pay_data' => $this->getUserDataPay($client->id)
            ];

            $data['html'] = view('template.dump', ['value' => $data])->toHtml();

            return $data;
        })->values();
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('super-admin');

        $request->validate([
            'client_id' => ['required', 'numeric', 'min:1'],
            'guests' => ['required', 'numeric', 'min:1'],
            'amount' => ['required', 'numeric', 'min:1'],
            'notify' => ['nullable'],
        ]);

        $payData = $this->getUserDataPay($request->client_id);

        if (!$payData || $payData['price'] != $request->amount || $payData['guests'] != $request->guests) {
            abort(422, trans('Les détails de paiement sont incorrects'));
        }

        $paymentCode = bin2hex(random_bytes(5));

        $pay = $this->query()->create([
            'amount' => $request->amount,
            'payment_code' => $paymentCode,
            'active' => true,
            'guests' => $request->guests,
            'user_id' => $request->client_id
        ]);

        if (!!$request->notify) {
            $this->notify($pay);
        }

        return [
            'message' => trans('Paiement personnalisé enregistré avec succès, code paiement') . ': ' . $paymentCode
        ];
    }

    /**
     * Nofify customer after storing of his custom payment 
     * 
     * @param User $user
     * @return void
     */
    public function notify(CustomPayment $customPayment)
    {
        $customPayment->user->notify(new CustomPaymentNotify($customPayment));
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function trash($id)
    {
        $this->authorize('super-admin');

        $payment = $this->queryPayment($id);

        $payment->active = !$payment->active;

        $payment->save();

        return [true];
    }
}
