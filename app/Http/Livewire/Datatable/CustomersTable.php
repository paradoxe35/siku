<?php

namespace App\Http\Livewire\Datatable;

use App\User;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\BooleanColumn;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;

class CustomersTable extends LivewireDatatable
{
    /**
     * @var string
     */
    public $hideable = 'select';

    /**
     * @var mixed
     */
    public $model = User::class;

    /**
     * @var bool
     */
    public $exportable = true;


    public function builder()
    {
        return User::withTrashed();
    }


    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide()
                ->filterable(),

            Column::name('name')
                ->truncate()
                ->filterable()
                ->label(trans("Nom")),

            Column::name('email')
                ->truncate()
                ->filterable()
                ->searchable()
                ->label(trans('Email')),

            Column::name('phone')
                ->filterable()
                ->searchable()
                ->label(trans('Téléphone')),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Créé à')),

            Column::name('events.id:count')
                ->label(trans('Événements')),

            BooleanColumn::raw('ISNULL(users.deleted_at) AS active')
                ->label(trans('Actif')),

            Column::callback(['id'], function ($id) {
                $route = route('admin.customers.show', ['id' => $id], false);
                return view('datatables::plink', ['href' => $route]);
            })
        ];
    }
}
