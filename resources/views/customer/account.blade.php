@extends('customer')

@section('customer-content')
<div data-controller="Customer--Account"
    data-Customer--Settings-event-account-route="{{ route('customer.event.account') }}">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Mon Compte') }}</h1>
            <h4 class="display-4 text-sm">
                {{ __('Editer le profil') }}
            </h4>
        </div>
    </div>
</div>
@endsection