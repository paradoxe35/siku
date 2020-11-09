<?php

namespace App\Http\Controllers\Admin\Sales;

use App\Http\Controllers\Controller;
use App\Models\Balance\Balance;
use App\User;
use App\View\Components\RForm;
use Illuminate\Http\Request;

class SalesController extends Controller
{

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return Balance::query()
            ->with('paymentMeta')
            ->with('user');
    }

    /**
     * @param mixed $query
     * 
     * @return mixed
     */
    private function confirmed($query)
    {
        return $query->where('confirmed', true);
    }

    /**
     * @param mixed $query
     * 
     * @return mixed
     */
    private function unconfirmed($query)
    {
        return $query->where('confirmed', false);
    }

    /**
     * @param mixed $query
     * 
     * @return mixed
     */
    private function ym($query, $y, $m)
    {
        if ($y && !$m) {
            $query = $query->whereYear('created_at', $y);
        } elseif ($y && $m) {
            $query = $query->whereYear('created_at', $y)
                ->whereMonth('created_at', $m);
        }

        return $query;
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
        $query = $this->query();

        if (request('confirmed') != 'unconfirmed') {

            $query = $this->confirmed($query);
        } else {

            $query = $this->unconfirmed($query);
        }

        if (request('ym')) {
            $ym = explode('-', request('ym'));
            $year = isset($ym[0]) && is_numeric($ym[0]) ? $ym[0] : null;
            $month = isset($ym[1]) && is_numeric($ym[1]) ? $ym[1] : null;
            $query = $this->ym($query, $year, $month);
        }


        if (request('email')) {
            $query = $this->email($query, request('email'));
        }


        $sales = $query->latest()->paginate();

        return view('admin.sales.home', compact('sales'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $sale = $this->query()->findOrFail($id);

        return view('admin.sales.show', compact('sale'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function update($id, Request $request)
    {
        $request->validate([
            'confirmed' => ['nullable']
        ]);

        $sale = $this->query()->findOrFail($id);

        $sale->fill(['confirmed' => !!$request->confirmed])->save();

        return ['redirect_url' => route('admin.sales.home', [], false)];
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $this->authorize('delete-sale');

        $sale = $this->query()->findOrFail($id);

        $sale->delete();

        return ['redirect_url' => route('admin.sales.home', [], false)];
    }
}
