<?php

namespace App\Http\Controllers\API\Customer\Payments;

use App\Http\Controllers\Controller;
use App\Http\Resources\Payments\Balance\BalanceCollection;
use App\Http\Resources\Payments\Consumed\ConsumedCollection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentsHistoryController extends Controller
{

    /**
     * @param \App\User $auth
     * @param int $month
     * @param int $year
     * @param bool $download
     * 
     * @return mixed
     */
    private function payments($auth, $month, $year, $download)
    {
        /** @var \App\Models\Balance\Balance */
        $balance = $auth->AllBalance()
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->latest()
            ->paginate();
        return new BalanceCollection($balance);
    }


    /**
     * @param \App\User $auth
     * @param int $month
     * @param int $year
     * @param bool $download
     * 
     * @return mixed
     */
    private function consumptions($auth, $month, $year, $download)
    {
        $consumeds = $auth->consumeds()
            ->select(DB::raw('DATE(created_at) as date, SUM(amount) as total_amount, event_id'))
            ->groupByRaw('DATE(created_at)')
            ->groupByRaw('event_id')
            ->whereMonth('created_at', $month)
            ->whereYear('created_at', $year)
            ->latest()
            ->paginate();
        return new ConsumedCollection($consumeds);
    }


    public function index(Request $request)
    {
        $auth = $request->user();
        $year = request('year');
        $month = request('month');
        $filter = request('filter');
        $download = request('download');

        switch ($filter) {
            case 'payments':
                return $this->payments($auth, $month, $year, $download);
                break;
            case 'consumptions':
                return $this->consumptions($auth, $month, $year, $download);
                break;
            default:
                return [];
                break;
        }
    }
}
