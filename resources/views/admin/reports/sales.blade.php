@extends('admin.reports')

@section('reports-content')
<form action="" method="get" class="mb-2" id="select-confirmed">
    <select name="custom-payments" onchange="rform(document.getElementById('select-confirmed'))"
        class="form-control-sm form-control w-auto d-inline-block">
        @foreach ([['', 'Ventes'], ['true', 'Paiement personnalisé']] as $item)
        <option value="{{ $item[0] }}" {{ request('custom-payments') == $item[0] ? 'selected' : '' }}>{{ __($item[1]) }}
        </option>
        @endforeach
    </select>
</form>

@if (request('custom-payments'))
<x-livewire.frame ref="datatable.custom-payments-table" />
@else
<x-livewire.frame ref="datatable.sales-table" />
@endif
@endsection