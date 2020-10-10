<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\Absent\AbsentCollection;
use App\Http\Resources\Attend\AttendCollection;
use App\Models\Event\Event;
use App\View\Paginator\CustomPaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\PDF;


class EventReportController extends Controller
{
    /**
     * @param \Illuminate\Database\Eloquent\Builder $model
     * @return array
     */
    public function queryChart($model): array
    {
        $datas = [
            'labels' => [],
            'data' => []
        ];

        $result = $model->select(DB::raw('HOUR(created_at) as hour, MINUTE(created_at) as minute, COUNT(id) as attended'))
            ->groupByRaw('HOUR(created_at)')
            ->groupByRaw('MINUTE(created_at)')
            ->latest()
            ->get();

        foreach ($result as $row) {
            array_push($datas['labels'], "{$row->hour}:{$row->minute}");
            array_push($datas['data'], $row->attended);
        }

        return $datas;
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function overview(Event $event)
    {
        $attend = $event->attends()
            ->whereRaw('DATE(created_at) = DATE(?)', [$event->event_date]);
        return $this->queryChart($attend);
    }


    /**
     * @param Event $event
     * 
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function queryAttended(Event $event)
    {
        return $event->attends()->with(['validator', 'guest'])->latest();
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function attended(Event $event)
    {
        $datas = $this->queryAttended($event)->paginate();
        return new AttendCollection($datas);
    }

    /**
     * @param Event|\Illuminate\Database\Eloquent\Builder $event
     * 
     * @return \Illuminate\Support\Collection
     */
    private function absents(Event $event)
    {
        $attended = $event->attends->map(fn ($v) => $v->guest_id)->values()->toArray();
        return $event->guests->filter(fn ($v) => !in_array($v->id, $attended));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function absent(Event $event, CustomPaginator $p)
    {
        $absents = $this->absents($event)->reverse();
        $paginate = $p->paginate($absents->values());
        return new AbsentCollection($paginate);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function download($event, Event $evt, PDF $pdf)
    {
        $event = $evt->findByHashid($event);
        $attended = $this->queryAttended($event)->get();
        $absents = $this->absents($event)->reverse();

        return $pdf->loadView('template.report.general', [
            'event' => $event,
            'attended' => $attended,
            'absents' => $absents->values()
        ])->setPaper('a4', 'landscape')
            ->setWarnings(false)
            ->download("report-{$event->hashid()}-" . time() . ".pdf");
    }
}
