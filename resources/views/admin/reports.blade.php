@extends('admin.layouts.admin')

@section('title', __("Rapport").' | ')

@section('admin-content')

<div data-controller="Rapport--Rapport">
    @include('admin.layouts.breadcrumb', ['page' => 'Rapport'])

    <div class="pt-3">
        <x-nav-tab :isTab="false" :links="[
            ['name' => 'Clients', 'route' => 'admin.reports.customers'],
            ['name' => 'Événements', 'route' => 'admin.reports.events'],
            ['name' => 'Ventes', 'route' => 'admin.reports.sales'],
            ['name' => 'Twilio SMS Status', 'route' => 'admin.reports.twilio-sms-status'],
            ['name' => 'PayPal Transactions', 'route' => 'admin.reports.paypal-transactions'],
            ['name' => 'Général', 'route' => 'admin.reports.general'],
        ]" />
    </div>

    <div class="card shadow-sm mb-3" style="background-color: #eaebf0;">
        <div class="card-body p-2">
            @yield('reports-content')
        </div>
    </div>
</div>

@endsection