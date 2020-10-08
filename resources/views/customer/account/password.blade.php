@extends('customer')

@section('customer-content')
<div data-controller="Customer--Account--Password"
    data-Customer--Account--Password-account-route="{{ route('customer.event.account') }}">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Mon Compte') }}</h1>
            <h4 class="display-4 text-sm">
                {{ __('Changer le mot de passe') }}
            </h4>

            <div class="row mt-3">
                <div class="col-lg-6">
                    <div data-target="Customer--Account--Password.innerError"></div>
                    <form data-target="Customer--Account--Password.editPassword" autocomplete="off" method="POST"
                        action="{{ route('api.customer.account.update.password') }}">
                        @csrf
                        <div class="form-group">
                            <input type="password" class="form-control" name="current_password"
                                placeholder="{{ __('Mot de passe existant') }}" required>
                        </div>

                        <div class="form-group">
                            <input type="password" placeholder="{{ __('Mot de passe') }}" class="form-control"
                                name="password" required>
                        </div>

                        <div class="form-group">
                            <input placeholder="{{ __('Confirmez le mot de passe') }}" type="password"
                                class="form-control" name="password_confirmation" required>
                        </div>

                        <div class="form-group mb-0">
                            <button type="submit" class="btn btn-default btn-sm">
                                {{ __('Mise à jour') }}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection