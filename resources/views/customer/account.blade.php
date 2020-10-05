@extends('customer')

@section('customer-content')
<div class="mb-5" data-controller="Customer--Account"
    data-Customer--Account-event-account-route="{{ route('customer.event.account') }}"
    data-Customer--Account-account-update-phone="{{ route('api.customer.account.update.phone') }}"
    >
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Mon Compte') }}</h1>

            <div data-target="Customer--Account.content">
                <div class="text-center mt-5" style="display: none" data-target="Customer--Account.spinning">
                    <x-spinning-dots />
                </div>

                <div data-target="Customer--Account.cardContent">
                    <h4 class="display-4 text-sm">
                        {{ __('Editer le profil') }}
                    </h4>
                    <div class="row mt-3">
                        <div class="col-lg-6">
                            <div data-target="Customer--Account.innerError"></div>
                            <form data-target="Customer--Account.editProfile" autocomplete="off" method="POST"
                                action="{{ route('api.customer.account.update') }}">
                                @csrf
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder="{{ __("Nom") }}" name="name"
                                        value="{{ Auth::user()->name }}" required autofocus>
                                </div>

                                <div class="form-group">
                                    <input type="email" placeholder="{{ __('E-Mail Adresse') }}"
                                        class="form-control d-block" name="email" value="{{ Auth::user()->email }}"
                                        required>
                                </div>

                                <div class="form-group row">
                                    <div class="col-lg-6">
                                        <label for="_phone">{{ __('Numéro de téléphone') }}</label>
                                        <div class="input-group input-group-merge">
                                            <input type="tel" readonly class="form-control"
                                                value="{{ Auth::user()->phone }}" id="_phone"
                                                placeholder="{{ __('téléphone') }}">
                                            <div class="input-group-append">
                                                <span class="input-group-text clickable-a" data-target="Customer--Account.phoneNumber">
                                                    <img src="{{ asset('img/svg/icons8-edit.svg') }}" alt="{{ __('Editer') }}">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group row my-5">
                                    <div class="col-lg-6">
                                        <label>{{ __('Mot de passe') }}</label>
                                        <a href="{{ route('customer.event.account.password') }}"
                                            class="btn btn-secondary d-flex justify-content-start shadow-sm border border-sm">
                                            <span class="btn-inner--icon mr-2">
                                                <img src="{{ asset('img/svg/iconmonstr-lock-26.svg') }}" alt="lock">
                                            </span>
                                            <span class="btn-inner--text">
                                                {{ __('Changer le mot de passe') }}
                                            </span>
                                        </a>
                                    </div>
                                </div>

                                <div class="form-group mb-0">
                                    <button type="submit" class="btn btn-default btn-sm">
                                        {{ __('Enregistrer les modifications') }}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection