<?php

namespace App\Http\Livewire\Datatable;

use App\Models\Payments\PaypalTransaction;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\BooleanColumn;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;

class PaypalTransactionsTable extends LivewireDatatable
{
    public $model = PaypalTransaction::class;

    /**
     * @var string
     */
    public $hideable = 'select';

    /**
     * @var bool
     */
    public $exportable = true;


    public function columns()
    {
        return [
            NumberColumn::name('id'),

            NumberColumn::name('transaction_id'),

            Column::name('user.email')->truncate()
                ->label(trans('Client Email')),

            DateColumn::name('created_at')
                ->label(trans('Créé à')),

            BooleanColumn::name('completed'),
        ];
    }
}
