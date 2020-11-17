@extends('admin.customers')

@section('customers-content')
<div class="row mb-3">
    <div class="col-lg-3">
        <x-rform>
            <input type="text" name="email" value="{{ request('email') }}"
                class="form-control form-control-sm form-control-alternative"
                placeholder="{{ __('Recherche') }} Email..." />
        </x-rform>
    </div>
    <div class="col-lg py-2"></div>
    <div class="col-lg-auto">
        @include('admin.layouts.selects.active')
    </div>
</div>

<x-card-table :paginate="$customers" :sort="true"
    :ths="['ID', 'Email', 'Téléphone', 'Pays', 'Créé à', 'Événements', 'Balance', 'actif']">
    @foreach ($customers as $customer)
    <tr class="clickable-a" onclick="tvisit('{{ route('admin.customers.show', ['id' => $customer->id]) }}')">
        <td>{{ $customer->id }}</td>
        <td>{{ $customer->email }}</td>
        <td>{{ $customer->phone }}</td>
        <td>{{ $customer->country_name }}</td>
        <td>{{ $customer->created_at }}</td>
        <td>{{ $customer->events()->count() }}</td>
        <td>{{ $symbol.$customer->balance() }}</td>
        <td>
            <x-status :value="!$customer->deleted_at" />
        </td>
    </tr>
    @endforeach
</x-card-table>
@endsection