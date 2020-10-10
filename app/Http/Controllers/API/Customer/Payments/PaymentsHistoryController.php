<?php

namespace App\Http\Controllers\API\Customer\Payments;

use App\Http\Controllers\Controller;
use App\Http\Resources\Payments\Balance\BalanceCollection;
use App\Http\Resources\Payments\Consumed\ConsumedCollection;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PaymentsHistoryController extends Controller
{

    /**
     * @var PDF
     */
    private PDF $pdf;


    /**
     * @param PDF $pdf
     */
    public function __construct(PDF $pdf)
    {
        $this->pdf = $pdf;
    }

    /**
     * @param array $datas
     * 
     * @return \Illuminate\Http\Response
     */
    private function reportPayments(array $datas, $month, $year)
    {
        return $this->pdf->loadView('template.report._payments.history.payments', [
            'histories' => $datas,
            'year' => $year,
            'month' => $month
        ])
            ->setWarnings(false)
            ->download("report-payments-" . time() . '.pdf');
    }

    /**
     * @param array $datas
     * 
     * @return \Illuminate\Http\Response
     */
    private function reportConsumptions(array $datas, $month, $year)
    {
        return $this->pdf->loadView('template.report._payments.history.consumeds', [
            'histories' => $datas,
            'year' => $year,
            'month' => $month
        ])
            ->setWarnings(false)
            ->download("report-consumptions-" . time() . '.pdf');
    }
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

        $datas = new BalanceCollection($balance);

        return $download ? $this->reportPayments($datas->toArray(null), $month, $year) : $datas;
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

        $datas = new ConsumedCollection($consumeds);

        return $download ? $this->reportConsumptions($datas->toArray(null), $month, $year) : $datas;
    }


    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
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

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function lowBalance(Request $request)
    {
        /** @var \App\User */
        $user = $request->user();
        $status = $user->lowBalance;
        return response()->json($status, $status ? 200 : 204);
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function setLowBalance(Request $request)
    {
        $request->validate([
            'amount' => ['required', 'min:0.01', 'numeric']
        ]);
        /** @var \App\User */
        $user = $request->user();
        if ($user->lowBalance) {

            $user->lowBalance->fill([
                'amount' => $request->amount
            ])->save();
        } else {

            $user->lowBalance()->create([
                'amount' => $request->amount
            ]);
        }

        $user->refresh();

        return $user->lowBalance;
    }

    /**
     * @param Request $request
     * 
     * @return \Illuminate\Http\Response
     */
    public function destoryLowBalance(Request $request)
    {
        /** @var \App\User */
        $user = $request->user();

        $user->lowBalance && $user->lowBalance->delete();

        return response()->json();
    }
}
