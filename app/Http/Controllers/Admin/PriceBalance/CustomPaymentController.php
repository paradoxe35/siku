<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use App\Models\Payments\CustomPayment;
use App\User;
use Illuminate\Http\Request;

class CustomPaymentController extends Controller
{

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
