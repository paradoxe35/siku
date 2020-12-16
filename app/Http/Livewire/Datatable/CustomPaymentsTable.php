<?php

namespace App\Http\Livewire\Datatable;

use App\Infrastructure\BasePrice;
use App\Models\Payments\CustomPayment;
use Mediconesystems\LivewireDatatables\Http\Livewire\LivewireDatatable;
use Mediconesystems\LivewireDatatables\BooleanColumn;
use Mediconesystems\LivewireDatatables\Column;
use Mediconesystems\LivewireDatatables\DateColumn;
use Mediconesystems\LivewireDatatables\NumberColumn;


class CustomPaymentsTable extends LivewireDatatable
{
    public $model = CustomPayment::class;

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

            NumberColumn::callback(['amount'], fn ($amount) => BasePrice::$symbol . $amount)
                ->filterable()
                ->label(trans('Montant')),

            NumberColumn::name('guests')
                ->label(trans('Invités')),

            Column::name('user.email')
                ->truncate()
                ->filterable()
                ->label(trans('Client Email')),

            Column::name('payment_code')
                ->filterable()
                ->label(trans('Code Paiement')),

            BooleanColumn::name('balance.id')->label(trans('Chargé')),

            BooleanColumn::name('active')
                ->label(trans('Autorisé')),

            Column::callback(['balance.id'], function ($id) {
                $route = route('admin.sales.show', ['id' => $id ? $id : 'null'], false);

                return $id ? view('datatables::plink', ['href' => $route]) : '';
            }),

            Column::callback(['id'], function ($id) {
                return view('datatables::pedit', ['id' => $id, 'fn' => 'trash']);
            }),
        ];
    }


    public function trash($id)
    {
        $payment = CustomPayment::find($id);

        $payment->active = !$payment->active;

        $payment->save();

        return $payment;
    }
}
