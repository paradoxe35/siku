@extends('layouts.app')

@section('body-class', 'no-footer')

@section('title', __("Mes événements").' | ')

@section('content')
@include('layouts.auth-navbar', ['top' => true])
<div class="main-content customer-settings" data-controller="Admin-Customer">
    <div class="container-fluid">
        <div class="blur--section mt-6">
            <div class="icons-container blur-item text-center d-none d-md-block">
                <h1>{{ $app_name }} {{ __('Configuration') }}</h1>
                <div id="personnal-settings"></div>
                <div class="card-status"></div>
            </div>
            <div class="blur-content mt-6">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-8 col-lg-7" data-controller="Customer--Events"
                        data-Customer--Events-events="{{ route('api.customer.events.index') }}"
                        data-Customer--Events-event-store="{{ route('api.customer.events.store') }}"
                        data-Customer--Events-cmp-details="{{ route('api.cmp-details.index') }}"
                        data-Customer--Events-payments-link-page="{{ route('api.customer.payments.link-page') }}">
                        <div class="card bg-transparent shadow-none">
                            <div class="card-body text-center">
                                <x-spinning-dots />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@include('template.customer-common-datas')
@endsection