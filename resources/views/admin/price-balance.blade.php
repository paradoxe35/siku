@extends('admin.layouts.admin')

@section('title', __("Prix et balance").' | ')

@section('admin-content')
<div data-controller="PriceBalance--Price-Balance">
    @include('admin.layouts.breadcrumb', ['page' => 'Prix et balance'])
    <div class="pt-3">
        <x-nav-tab :isTab="false" :links="[
            ['name' => 'Paiement personnalisé', 'route' => 'admin.price-balance.custom-payment'],
            ['name' => 'Solde par défaut', 'route' => 'admin.price-balance.default-balance'],
            ['name' => 'Tarification', 'route' => 'admin.price-balance.prices'],
            ['name' => 'Services', 'route' => 'admin.price-balance.services'],
        ]" />
    </div>
    <div class="mb-3">
        @yield('price-balance-content')
    </div>
</div>
@endsection