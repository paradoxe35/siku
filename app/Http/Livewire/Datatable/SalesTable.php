<?php

namespace App\Http\Livewire\Datatable;

use App\Infrastructure\BasePrice;
use App\Models\Balance\Balance;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\BooleanColumn;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class SalesTable extends LivewireDatatable
{
    /**
     * @var string
     */
    public $hideable = 'select';

    /**
     * @var mixed
     */
    public $model = Balance::class;

    /**
     * @var bool
     */
    public $exportable = true;


    public function columns()
    {
        return [
            NumberColumn::name('id')
                ->hide(),

            Column::callback(['id', 'created_at'], fn ($id) => Balance::find($id)->hashId())
                ->label(trans('Hash')),

            NumberColumn::callback(['amount'], fn ($amount) => BasePrice::$symbol . $amount)
                ->filterable()
                ->label(trans('Montant')),

            Column::name('user.email')
                ->truncate()
                ->filterable()
                ->label(trans('Client Email')),

            Column::name('paymentMeta.service')
                ->label(trans('Méthode')),

            BooleanColumn::name('confirmed')
                ->label(trans('Confirmé')),

            DateColumn::name('created_at')
                ->filterable()
                ->label(trans('Créé à')),


            Column::callback(['id'], function ($id) {
                $route = route('admin.sales.show', ['id' => $id], false);
                return view('datatables::plink', ['href' => $route]);
            })
        ];
    }
}
