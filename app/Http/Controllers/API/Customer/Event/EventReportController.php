<?php

namespace App\Http\Controllers\API\Customer\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\Absent\AbsentCollection;
use App\Http\Resources\Attend\AttendCollection;
use App\Models\Event\Event;
use App\View\Paginator\CustomPaginator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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
     * @return \Illuminate\Http\Response
     */
    public function attended(Event $event)
    {
        $datas = $event->attends()->latest()->paginate();
        return new AttendCollection($datas);
    }

    /**
     * @param Event $event
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
        $absents = $this->absents($event);
        $paginate = $p->paginate($absents->values());
        return new AbsentCollection($paginate);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function download(Event $event)
    {
        return 'salut';
    }
}
