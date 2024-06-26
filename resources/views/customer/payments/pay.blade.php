@extends('customer')
@inject('basePice', 'App\Infrastructure\BasePrice')

@section('title', __("Méthode de paiement").' | ')

@section('head-secondary')
<meta name="turbolinks-visit-control" content="reload">
<script defer id="paypay-script"
    src="https://www.paypal.com/sdk/js?currency={{ $basePice::$currency_code }}&client-id={{ env("PAYPAL_CLIENT_ID") }}">
</script>
@endsection

@section('customer-content')
<div data-controller="Customer--Payments--Pay"
    data-Customer--Payments--Pay-cmp-details="{{ route('api.cmp-details.index') }}"
    data-Customer--Payments--Pay-custom-payment-validate="{{ route('api.customer.payments.custom-payment-validate') }}"
    data-Customer--Payments--Pay-paypal-return-url="{{ route('customer.event.payments') }}"
    data-Customer--Payments--Pay-paypal-cancel-url="{{ route('customer.event.payments.new.pay') }}"
    data-Customer--Payments--Pay-paypal-create-paypal-transaction="{{ route('api.customer.payments.create-paypal-transaction') }}"
    data-Customer--Payments--Pay-paypal-get-paypal-transaction="{{ route('api.customer.payments.get-paypal-transaction') }}"
    data-Customer--Payments--Pay-paypal-cancel-paypal-transaction="{{ route('api.customer.payments.cancel-paypal-transaction') }}">
    <div class="row mb-4">
        <div class="col">
            <h1 class="display-4">{{ __('Choisissez une méthode de paiement') }}</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-12" data-target="Customer--Payments--Pay.content">
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