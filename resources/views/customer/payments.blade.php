@extends('customer')


@section('customer-content')
<div class="mb-7" data-controller="Customer--Payments"
    data-Customer--Payments-history-index="{{ route('api.customer.payments.history.index') }}"
    data-Customer--Payments-history-low-balance="{{ route('api.customer.payments.history.low-balance') }}">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Facturation et paiements') }}</h1>
        </div>
    </div>
    <div class="row mb-4">
        <div class="col-lg-5">
            <div class="card shadow-sm border">
                <div class="card-body">
                    <h4>{{ __('Le solde de votre compte est') }} <b class="text-lg">{{ $symbol }}{{ Auth::user()->balance() }}</b></h4>
                    <a href="{{ route('customer.event.payments.new') }}"
                        class="btn btn-primary text-white btn-sm d-inline-flex align-content-center">
                        <span>{{ __('Ajouter des fonds') }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-12" data-target="Customer--Payments.content">
            <div class="text-center mt-5">
                <x-spinning-dots />
            </div>
        </div>
    </div>
</div>
@endsection