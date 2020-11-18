<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use App\Models\DefaultBalance\DefaultBalance;
use Illuminate\Http\Request;

class DefaultBalanceController extends Controller
{
    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return DefaultBalance::query();
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $balance = $this->query()->first();

        return view('admin.price-balance.default-balance', [
            'balance' => $balance
        ]);
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setBalances(Request $request)
    {
        $this->authorize('super-admin');

        $data = $request->validate([
            'mail' => ['required', 'numeric', 'min:0'],
            'sms' => ['required', 'numeric', 'min:0'],
        ]);

        $balance = $this->query()->first();

        if ($balance) {
            $balance->fill($data)->save();
        } else {
            $this->query()->create($data);
        }

        return ['message' => trans('Modifications sauvegardés avec succès')];
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function clearBalances()
    {
        $this->authorize('super-admin');

        $balance = $this->query()->first();

        if ($balance) {
            $balance->delete();
        }

        return ['message' => trans('Modifications sauvegardés avec succès')];
    }
}
