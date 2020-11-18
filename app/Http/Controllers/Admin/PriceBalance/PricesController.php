<?php

namespace App\Http\Controllers\Admin\PriceBalance;

use App\Http\Controllers\Controller;
use App\Infrastructure\BasePrice;
use App\Repositories\BasePriceRepository;
use Illuminate\Http\Request;

class PricesController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $sms = BasePrice::getAmountSms();

        $mail = BasePrice::getAmountMail();

        return view('admin.price-balance.prices', compact('sms', 'mail'));
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setRevenue(Request $request)
    {
        $this->authorize('super-admin');

        $request->validate([
            'mail' => ['required', 'numeric', 'min:0'],
            'sms' => ['required', 'numeric', 'min:0'],
        ]);

        BasePriceRepository::setAmounts($request->sms, $request->mail);

        return ['message' => trans('Modifications sauvegardés avec succès')];
    }
}
