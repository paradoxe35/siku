@extends('customer')

@section('title', __("Paiement").' | ')

@section('customer-content')
<div data-controller="Customer--Payments--New"
    data-Customer--Payments--New-country-pricing="{{ route('api.country-pricing') }}"
    data-Customer--Payments--New-pay-data="{{ route('api.customer.payments.pay-data') }}">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Paiement') }}</h1>
        </div>
    </div>
    @include('layouts.unconfirmed-email', ['classRow' => 'justify-content-center'])
    <div class="row">
        <div class="col-12" data-target="Customer--Payments--New.content">
            <div class="text-center mt-5">
                <x-spinning-dots />
            </div>
        </div>
    </div>
</div>
<script>
    window.payData = @json(session('pay-data'))
</script>
@endsection