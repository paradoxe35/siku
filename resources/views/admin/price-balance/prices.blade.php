@extends('admin.price-balance')

@section('price-balance-content')

<div class="row" data-controller="PriceBalance--Prices">
    <div class="col-lg-5 mb-4">
        <h4 class="py-2">{{ __('Revenu') }}</h4>
        <form data-target="PriceBalance--Prices.form" autocomplete="off"
            action="{{ route('admin.price-balance.prices') }}" method="POST">
            <div class="form-group">
                <label for="sms" class="form-control-label">{{ __('SMS') }}</label>
                <input class="form-control" type="text" name="sms" value="{{ $sms }}" id="sms">
            </div>

            <div class="form-group">
                <label for="mail" class="form-control-label">{{ __('Mail') }}</label>
                <div class="input-group input-group-merge">
                    <input class="form-control" type="text" name="mail" value="{{ $mail }}" id="mail">
                    <div class="input-group-append">
                        <span class="input-group-text text-sm">{{ __('Revenu') }} (/2)</span>
                    </div>
                </div>
            </div>
            <button class="btn btn-primary btn-sm" type="submit">
                {{ __('Enregistrer') }}
            </button>
        </form>
    </div>

    <div class="col-lg-7" data-controller="PriceBalance--Pricing"
        data-PriceBalance--Pricing-country-pricing="{{ route('api.country-pricing') }}">
        <h4 class="py-2">{{ __('Tarification') }}</h4>
        <x-card>
            <x-slot name="title">
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <select class="text-sm w-100" data-target="PriceBalance--Pricing.countrySelectField"
                            style="margin-top: 3px;" data-toggle="select">
                        </select>
                    </div>
                    <div class="col-md-6">
                        <input type="number" data-target="PriceBalance--Pricing.guestField"
                            class="form-control form-control-alternative" placeholder="Invitations">
                    </div>
                </div>
            </x-slot>
            <div class="row">
                <div class="col-lg-6">
                    <div class="text-center">
                        <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                            @include('template.svg.sms')
                        </div>
                        <h4 class="h4 text-default text-uppercase">{{ __("SMS") }}</h4>
                    </div>
                    <h4 class="display-4 text-center" data-target="PriceBalance--Pricing.smsPrice">$0</h4>
                </div>
                <div class="col-lg-6">
                    <div class="text-center">
                        <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                            @include('template.svg.mail')
                        </div>
                        <h4 class="h4 text-default text-uppercase">{{ __("Mail") }}</h4>
                    </div>
                    <h4 class="display-4 text-center" data-target="PriceBalance--Pricing.wtspPrice">$0</h4>
                </div>
            </div>
        </x-card>
    </div>
</div>
@endsection