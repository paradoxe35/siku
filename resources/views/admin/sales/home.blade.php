@extends('admin.sales')

@section('sales-content')
<div class="row mb-3">
    <div class="col-lg-5">
        <div class="row">
            <div class="col">
                <x-rform>
                    <input type="text" name="ym" value="{{ request('ym') }}"
                        class="form-control form-control-sm form-control-alternative"
                        placeholder="{{ __('Année').'-'.__('Mois') }}" />
                </x-rform>
            </div>
            <div class="col">
                <x-rform>
                    <input type="text" name="email" value="{{ request('email') }}"
                        class="form-control form-control-sm form-control-alternative"
                        placeholder="{{ __('Client Email') }}" />
                </x-rform>
            </div>
        </div>
    </div>
    <div class="col-lg py-2"></div>
    <div class="col-lg-auto">
        @include('admin.layouts.selects.confirmed')
    </div>
</div>

<x-card-table :paginate="$sales" :sort="true" :ths="['ID', 'Client Email', 'Créé à', 'Méthode',  'Montant', 'Confirmé','Actif']">
    @foreach ($sales as $sale)
    <tr class="clickable-a" onclick="tvisit('{{ route('admin.sales.show', ['id' => $sale->id]) }}')">
        <td>{{ $sale->hashId() }}</td>
        <td>{{ $sale->user->email }}</td>
        <td>{{ $sale->created_at }}</td>
        <td>{{ $sale->paymentMeta->service }}</td>
        <td>{{ $symbol.$sale->amount }}</td>
        <td>
            <x-status :value="$sale->confirmed" />
        </td>
        <td>
            <x-status :value="!$sale->trashed()" />
        </td>
    </tr>
    @endforeach
</x-card-table>
@endsection