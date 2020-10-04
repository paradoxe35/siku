@extends('customer')


@section('customer-content')
<div data-controller="Customer--Payments">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Facturation et paiements') }}</h1>
        </div>
    </div>
</div>
@endsection