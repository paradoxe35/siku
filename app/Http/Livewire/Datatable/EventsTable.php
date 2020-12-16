<?php

namespace App\Http\Livewire\Datatable;

use App\Models\Event\Event;
use Mediconesystems\LivewireDatatables\BooleanColumn;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;

class EventsTable extends LivewireDatatable
{
    /**
     * @var string
     */
    public $hideable = 'select';

    /**
     * @var bool
     */
    public $exportable = true;

    /**
     * @var string
     */
    public $model = Event::class;


    public function builder()
    {
        return Event::withTrashed();
    }

    /**
     * @return array
     */
    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide()
                ->filterable(),

            Column::name('name')->filterable()->searchable()
                ->label(trans("Nom de l'événement")),

            Column::name('user.email')->truncate()
                ->filterable()
                ->label(trans('Client Email')),

            DateColumn::name('event_date')
                ->filterable()
                ->label(trans("Date d'événement")),

            NumberColumn::name('guests.id:count')
                ->label(trans('Invités')),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Créé à')),

            BooleanColumn::raw('ISNULL(events.deleted_at) AS active'),

            Column::callback(['id'], function ($id) {
                $route = route('admin.events.show', ['id' => $id], false);
                return view('datatables::plink', ['href' => $route]);
            })
        ];
    }
}
