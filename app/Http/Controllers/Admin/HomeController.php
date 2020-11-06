<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Infrastructure\BasePrice;
use App\Models\Balance\Balance;
use App\Models\Balance\Consumed;
use App\Models\Chat\TelegramReference;
use App\Models\Event\Event;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function queryBal()
    {
        return Balance::query();
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function queryCon()
    {
        return Consumed::query();
    }

    /**
     * @return array
     */
    private function salesChartMonth()
    {
        $datas = [
            'labels' => [],
            'data' => []
        ];

        $result = $this->queryBal()
            ->select(DB::raw('MONTHNAME(created_at) as month, SUM(amount) as amount'))
            ->groupByRaw('MONTHNAME(created_at)')
            ->whereRaw(DB::raw('DATE(created_at) BETWEEN SUBDATE(NOW(), INTERVAL 8 MONTH) AND NOW()'))
            ->get()
            ->reverse();

        foreach ($result as $row) {
            array_push($datas['labels'], substr($row->month, 0, 3));
            array_push($datas['data'], round($row->amount, 2));
        }

        return $datas;
    }

    /**
     * @return array
     */
    private function salesChartWeek()
    {
        $datas = [
            'labels' => [],
            'data' => []
        ];

        $result = $this->queryBal()
            ->select(DB::raw('DAYNAME(created_at) as day, SUM(amount) as amount'))
            ->groupByRaw('DAYNAME(created_at)')
            ->whereRaw(DB::raw('DATE(created_at) BETWEEN SUBDATE(NOW(), INTERVAL 1 WEEK) AND NOW()'))
            ->get()
            ->reverse();

        foreach ($result as $row) {
            array_push($datas['labels'], substr($row->day, 0, 3));
            array_push($datas['data'], round($row->amount, 2));
        }

        return $datas;
    }

    /**
     * @return array
     */
    private function sendChartMonth()
    {
        $datas = [
            'labels' => [],
            'data' => []
        ];

        $result = $this->queryCon()
            ->select(DB::raw('MONTHNAME(created_at) as month, COUNT(id) as count'))
            ->groupByRaw('MONTHNAME(created_at)')
            ->whereRaw(DB::raw('DATE(created_at) BETWEEN SUBDATE(NOW(), INTERVAL 8 MONTH) AND NOW()'))
            ->get()
            ->reverse();

        foreach ($result as $row) {
            array_push($datas['labels'], substr($row->month, 0, 3));
            array_push($datas['data'], $row->count);
        }

        return $datas;
    }

    /**
     * @param \Illuminate\Database\Eloquent\Builder $query
     * 
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function monthlyQuery($query)
    {
        return $query->whereRaw(DB::raw('DATE(created_at) BETWEEN SUBDATE(NOW(), INTERVAL 1 MONTH) AND NOW()'));
    }

    /**
     * @return double
     */
    private function revenueDetail()
    {
        $basePrice = BasePrice::getAmount();

        $revenueQeury = $this->monthlyQuery($this->queryBal());

        $guests = $revenueQeury->sum('guests');
        $amout = $revenueQeury->sum('amount');

        return $amout - ($guests * $basePrice);
    }

    /**
     * @return int
     */
    private function newEvents()
    {
        $events = $this->monthlyQuery(Event::query());

        return $events->count('id');
    }

    /**
     * @return int
     */
    private function newClients()
    {
        $users = $this->monthlyQuery(User::query()->where('is_admin', false));

        return $users->count('id');
    }

    /**
     * @return int
     */
    private function sendInvitations()
    {
        $users = $this->monthlyQuery(Consumed::query());

        return $users->count('id');
    }

    /**
     * @return array
     */
    private function mensualDetails()
    {
        $revenue = $this->revenueDetail();
        $newEvents = $this->newEvents();
        $newClients = $this->newClients();
        $sendInvitations = $this->sendInvitations();

        return compact('revenue', 'newEvents', 'newClients', 'sendInvitations');
    }


    /**
     * @return array
     */
    private function latest()
    {
        $events = Event::query()
            ->latest()
            ->limit(6)
            ->get();

        $chats = TelegramReference::query()
            ->with('user')
            ->latest('updated_at')
            ->limit(6)
            ->get();

        return compact('events', 'chats');
    }

    /**
     * Undocumented function
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chartSalesMonth = $this->salesChartMonth();
        $chartSalesWeek = $this->salesChartWeek();
        $chartSendMonth = $this->sendChartMonth();

        return view('admin.home', array_merge(
            [
                'chartSalesMonth' => json_encode($chartSalesMonth),
                'chartSalesWeek' => json_encode($chartSalesWeek),
                'chartSendMonth' => json_encode($chartSendMonth)
            ],
            $this->mensualDetails(),
            $this->latest()
        ));
    }
}
