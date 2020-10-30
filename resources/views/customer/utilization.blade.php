@extends('customer')

@section('title', __("Utilisation").' | ')

@section('customer-content')

<div data-controller="Customer--Utilization"
    data-Customer--Utilization-event-validators="{{ route('api.customer.events.validators.index') }}"
    data-Customer--Utilization-event-validators-store="{{ route('api.customer.events.validators.store') }}">
    <h1 class="display-4">{{ __('Utilisation') }}</h1>
    <div class="row">
        <div class="col-lg-8">
            <p class="text-muted">
                <small>
                    {{ __("Enregister les utilisateurs qui seront autorisés à valider les invitations") }}. <br>
                    {{ __("Une application mobile est fournie pour la procédure de validation") }},
                    {{ __("Vous pouvez le télécharger depuis Google Play Store pour les téléphones Android ou AppStore pour IOS") }}.
                </small>
            </p>
        </div>
    </div>
    <hr class="my-3">
    <div class="row">
        <div class="col-12" data-target="Customer--Utilization.content">
            <div class="text-center mt-5">
                <x-spinning-dots />
            </div>
        </div>
    </div>
</div>
@endsection