@extends('customer')

@section('head-secondary')
{{-- <script defer
    src="https://www.paypal.com/sdk/js?client-id=AQX_Lmvi9wRcFzBQGVj8xxN5znPZHVgMVYcbe5yQZ3Bm2tXQZ2PJB30vIfWQ1KPuc3c8s20jnklvCYs0&currency=USD">
</script> --}}
@endsection

@section('customer-content')
<div class="mb-9" data-controller="Customer--Payments--New"
    data-Customer--Payments--New-cmp-details="{{ route('api.cmp-details.index') }}"
    data-Customer--Payments--New-country-pricing="{{ route('api.country-pricing') }}"
    data-Customer--Payments--New-custom-payment-validate="{{ route('api.customer.payments.custom-payment-validate') }}">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Paiement') }}</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-12" data-target="Customer--Payments--New.content">
            <div class="text-center mt-5">
                <x-spinning-dots />
            </div>
        </div>
    </div>
</div>
@endsection