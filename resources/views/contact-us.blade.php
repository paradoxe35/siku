@extends('layouts.app')

@section('title', __("Nous contacter").' | ')

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="ContactUs">
    <section id="hero">
        <div class="inner">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-5 offset-md-1"></div>
                    <div class="col-12 col-md-6 col-lg-6 mt--7">
                        <aside class="secondary-content">
                            <img src="{{ asset('img/svg/contact_us.svg') }}">
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="pb-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-lg-11 mt--9">
                    <div class="card mb-4">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-5">
                                    <h3 class="font-weight-bold">{{ __('Nous contacter') }}</h3>
                                    <div class="mt-4">
                                        @if ($detail)
                                        <p>
                                            <span class="font-weight-bold mr-2">
                                                {{ __('E-mail') }}:
                                            </span>
                                            <a href="mailto:{{ $detail->public_email }}">{{ $detail->public_email }}</a>
                                        </p>
                                        <p>
                                            <span class="font-weight-bold mr-2">
                                                {{ __('Téléphone') }}:
                                            </span>
                                            <a href="tel:{{ $detail->public_phone }}">{{ $detail->public_phone }}</a>
                                        </p>
                                        @endif
                                        <p class="text-muted">
                                            {{ __('Nous pouvons vous aider à trouver la bonne solution à vos préoccupations. Veuillez remplir le formulaire.') }}
                                        </p>

                                        <h4 class="font-weight-bold">{{ __('Signaler un abus ou tout problème') }}</h4>

                                        <p class="text-muted">
                                            {{ __('Si vous constatez un inconvénient dans nos services, nous vous serions reconnaissants de bien vouloir le signaler.') }}
                                        </p>
                                    </div>
                                </div>
                                <div class="col-lg-7">
                                    <form data-target="ContactUs.form"
                                        action="{{ route('api.customer-request.store') }}" method="POST">
                                        <input type="hidden" name="app_name" value="{{ $app_name }}">
                                        <div class="row">
                                            <div class="col-lg-6">
                                                <div class="md-form md-outline mt-3">
                                                    <label for="form-email">{{ __('E-mail') }}</label>
                                                    <input type="email" name="email" required id="form-email"
                                                        class="form-control">
                                                </div>
                                            </div>
                                            <div class="col-lg-6">
                                                <div class="md-form md-outline mt-3">
                                                    <label for="form-tel">{{ __('Téléphone') }}</label>
                                                    <input type="tel" name="phone" required id="form-tel"
                                                        class="form-control">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="md-form md-outline mt-3">
                                            <label for="form-subject">{{ __('Sujet') }}</label>
                                            <input type="text" required id="form-subject" name="subject"
                                                class="form-control">
                                        </div>
                                        <div class="md-form md-outline mb-3 mt-3">
                                            <label for="form-message">{{ __('Comment pouvons-nous aider') }}?</label>
                                            <textarea id="form-message" required name="message"
                                                class="md-textarea form-control" rows="3"></textarea>
                                        </div>
                                        <button type="submit" class="btn btn-default ml-0">
                                            {{ __('Envoyer') }}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
@endsection