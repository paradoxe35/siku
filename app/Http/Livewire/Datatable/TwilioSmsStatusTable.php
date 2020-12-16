<?php

namespace App\Http\Livewire\Datatable;

use App\Models\Balance\Consumed;
use App\Models\Twilio\TwilioSms;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\BooleanColumn;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class TwilioSmsStatusTable extends LivewireDatatable
{

    public $model = TwilioSms::class;

    /**
     * @var string
     */
    public $hideable = 'select';

    /**
     * @var string
     */
    public $beforeTableSlot = 'livewire.components.twilio-sms-status';

    /**
     * @var bool
     */
    public $exportable = true;


    public function columns()
    {
        return [
            NumberColumn::name('id'),

            Column::name('sid'),

            Column::name('status')->filterable(),

            Column::name('price')
                ->label(trans('Twilio Price')),

            BooleanColumn::name('consumed')
                ->label(trans('Consommé')),

            DateColumn::name('created_at')
                ->label(trans('Créé à')),

            Column::callback(['data', 'consumed_id', 'sid'], function ($data, $consumed_id, $sid) {
                if ($consumed_id) {
                    $model = Consumed::find($consumed_id);
                    $consumed = $model ? $model->toArray() : null;
                } else {
                    $consumed = null;
                }

                $datas =  $this->view('template.dump', [
                    'value' => [
                        'sid' => $sid,
                        'data' => json_decode($data, true),
                        'consumed' => $consumed
                    ]
                ])->toHtml();

                return view('datatables::plink-modal', ['data' => base64_encode($datas)]);
            })
        ];
    }


    /**
     * @param mixed $m
     * @param mixed $d
     * 
     * @return mixed
     */
    private function view($m, $d)
    {
        return view($m, $d);
    }
}
