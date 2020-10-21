@extends('auth')

@section('first')
<div data-controller="Auth--Signup">
    <h1 class="display-4">{{ __("Nouveau Compte") }}</h1>
    <p class="text-lead">
        {{ __("Vous avez déjà un compte") }}?
        <a href="{{ route('sign-in') }}">{{ __("Se connecter") }}</a>.
    </p>
    <div data-target="Auth--Signup.innerError"></div>
    <form method="POST" action="{{ route('sign-up') }}" data-action="Auth--Signup#register">
        @csrf
        <div class="form-group row">
            <div class="col-lg-5">
                <input id="name" type="text" class="form-control" placeholder="{{ __("Nom") }}"
                    name="name" value="{{ old('name') }}" required>
            </div>
            <div class="col-lg-7">
                <div class="input-group input-group-merge">
                    <div class="input-group-prepend">
                        <div class="p-1 border">
                            <select class="text-sm" data-target="Auth--Signup.countryCodeBtn" style="margin-top: 3px;"
                                data-toggle="select">
                            </select>
                        </div>
                    </div>
                    <input id="phone" type="tel" class="form-control border pl-2"
                        placeholder="{{ __("Numéro de téléphone") }}" data-target="Auth--Signup.phone" name="phone"
                        value="{{ old('phone') }}" required>
                </div>
            </div>
        </div>
        <div class="form-group">
            <input id="email" type="email" class="form-control" placeholder="{{ __("E-Mail Adresse") }}" name="email"
                value="{{ old('email') }}" required>
        </div>
        <div class="form-group">
            <input id="password" type="password" class="form-control" name="password" required
                placeholder="{{ __("Mot de passe") }}">
        </div>

        <div class="form-group">
            <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required
                placeholder="{{ __("Confirmez le mot de passe") }}">
        </div>
        <div class="form-group mb-0">
            <button type="submit" class="btn btn-default">
                {{ __('Créer un compte') }}
            </button>
        </div>
    </form>

    <p class="mt-3">
        <small class="Vlt-grey-darker text-muted">
            <div class="form text-sm">{{ __('En vous inscrivant, vous acceptez notre') }}
                <a href="javascript:;" target="_blank">{{ __('Termes et conditions') }}</a>.
            </div>
        </small>
    </p>
</div>
@endsection

@section('second')
<div class="signup-backdrop-pattern"></div>
@endsection