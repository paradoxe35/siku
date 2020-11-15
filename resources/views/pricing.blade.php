@extends('layouts.app')

@section('title', __("Tarification").' | ')

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="Pricing" data-Pricing-country-pricing="{{ route('api.country-pricing') }}">
    <section id="hero">
        <div class="inner">
            <div class="container-fluid">
                <h1 class="text-center display-2">{{ __('Tarification') }}</h1>
            </div>
        </div>
    </section>

    <section class="pb-5 bg-white">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-10 mt--9">
                    <div class="pricing card-group flex-column flex-md-row mb-3">
                        <div class="card card-pricing border-0 text-center mb-4">
                            <div class="card-header bg-transparent">
                                <div class="row">
                                    <div class="col-md-6">
                                        <select class="text-sm w-100" data-target="Pricing.countrySelectField"
                                            style="margin-top: 3px;" data-toggle="select">
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <input type="number" data-target="Pricing.guestField"
                                            class="form-control form-control-alternative" placeholder="Invitations">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body px-lg-7">
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="card card-lift--hover shadow-none border-0">
                                            <div class="card-body py-5">
                                                <div class="text-center">
                                                    <div
                                                        class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                                        @include('template.svg.sms')
                                                    </div>
                                                    <h4 class="h4 text-default text-uppercase">{{ __("SMS") }}</h4>
                                                </div>
                                                <h4 class="display-4" data-target="Pricing.smsPrice">$0</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="card card-lift--hover shadow-none border-0">
                                            <div class="card-body py-5">
                                                <div class="text-center">
                                                    <div
                                                        class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                                        @include('template.svg.mail')
                                                    </div>
                                                    <h4 class="h4 text-default text-uppercase">{{ __("Mail") }}</h4>
                                                </div>
                                                <h4 class=" display-4" data-target="Pricing.wtspPrice">$0</h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="card-footer">
                                    <a href="{{ route('sign-up') }}"
                                        class="text-light">{{ __('Commencez maintenant') }}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container">
            <div class="d-flex justify-content-lg-center px-3 mt-5">
                <div>
                    <div class="icon icon-shape bg-gradient-primary shadow rounded-circle text-primary">
                    </div>
                </div>
                <div class="col-lg-6">
                    <p>
                        {{ __("Si nos tarifs ne vous conviennent pas, veuillez nous contacter pour plus d'informations") }}.
                    </p>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection