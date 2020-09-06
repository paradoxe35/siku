@extends('customer')

@section('customer-content')
<div data-controller="Customer--Product">
    <p><b><span>{{ __('Bienvenue à nouveau') }}, {{ Auth::user()->name }}</span></b></p>
    <h1 class="display-4">{{ $event['name'] }}</h1>
    <div class="row mb-0">
        <div class="col-xl-3 col-md-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h5 class="card-title text-xs text-uppercase text-muted mb-0">
                                {{ __('Invités') }}
                            </h5>
                            <span class="h2 font-weight-bold mb-0">
                                {{ $event['guests'] }}
                            </span>
                        </div>
                        <div class="col-auto">
                            <div class="icon icon-shape text-default rounded-circle shadow">
                                <i class="ni ni-active-40"></i>
                            </div>
                        </div>
                    </div>
                    <p class="mt-3 mb-0 text-xs">
                        <span class="text-nowrap">
                            {{ __("Nombre d'invité présumé") }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h5 class="card-title text-xs text-uppercase text-muted mb-0">
                                {{ __('invités enregistrés') }}
                            </h5>
                            <span class="h2 font-weight-bold mb-0">
                                {{ $customer_event->guests()->count() }}
                            </span>
                        </div>
                        <div class="col-auto">
                            <div class="icon icon-shape text-default rounded-circle shadow">
                                <i class="ni ni-chart-pie-35"></i>
                            </div>
                        </div>
                    </div>
                    <p class="mt-3 mb-0 text-xs">
                        <span class="text-nowrap">
                            {{ __("Vos d'invités enregistrés") }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h5 class="card-title text-xs text-uppercase text-muted mb-0">
                                {{ __('Utilisé') }}
                            </h5>
                            <span class="h2 font-weight-bold mb-0">
                                ${{ $customer_event->totalConsumeds() }}
                            </span>
                        </div>
                        <div class="col-auto">
                            <div class="icon icon-shape text-default rounded-circle shadow">
                                <i class="ni ni-money-coins"></i>
                            </div>
                        </div>
                    </div>
                    <p class="mt-3 mb-0 text-xs">
                        <span class="text-nowrap">
                            {{ __("Montant consommé") }}
                        </span>
                    </p>
                </div>
            </div>
        </div>
        <div class="col-xl-3 col-md-6">
            <div class="card shadow-sm">
                <div class="card-body">
                    <div class="row">
                        <div class="col">
                            <h5 class="card-title text-xs text-uppercase text-muted mb-0">
                                {{ __('Envoyées') }}
                            </h5>
                            <span class="h2 font-weight-bold mb-0">
                                {{ $customer_event->invitationSent() }}
                            </span>
                        </div>
                        <div class="col-auto">
                            <div class="icon icon-shape text-default rounded-circle shadow">
                                <i class="ni ni-chart-bar-32"></i>
                            </div>
                        </div>
                    </div>
                    <p class="mt-3 mb-0 text-xs">
                        <span class="text-nowrap">{{ __('Invitations Envoyées') }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-12" data-target="Customer--Product.content">
            <div class="text-center mt-7">
                <x-spinning-dots />
            </div>
        </div>
    </div>
</div>
@endsection