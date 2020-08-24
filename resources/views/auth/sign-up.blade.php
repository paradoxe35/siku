@extends('auth')

@section('first')
<h1>{{ __("Nouveau Compte") }}</h1>
<p class="text-lead">
    {{ __("Vous avez déjà un compte") }}?
    <a href="{{ route('sign-in') }}">{{ __("Se connecter") }}</a>.
</p>
<form method="POST" action="{{ route('sign-up') }}" data-controller="Auth--Signup">
    @csrf
    <div class="form-group row">
        <div class="col-lg-5">
            <input id="email" type="email" class="form-control @error('email') is-invalid @enderror"
                placeholder="{{ __("E-Mail Adresse") }}" name="email" value="{{ old('email') }}" required
                autocomplete="email">
            @error('email')
            <span class="invalid-feedback" role="alert">
                <strong>{{ $message }}</strong>
            </span>
            @enderror
        </div>
        <div class="col-lg-7">
            <div class="input-group input-group-merge">
                <div class="input-group-prepend">
                    <div class="p-1 border">
                        <select class="text-sm" data-target="Auth--Signup.countryCodeBtn" style="margin-top: 3px;" data-toggle="select">
                        </select>
                    </div>
                </div>
                <input id="phone" type="tel" class="form-control border pl-2 @error('phone') is-invalid @enderror"
                    placeholder="{{ __("Numéro de téléphone") }}" name="phone" value="{{ old('phone') }}" required
                    autocomplete="phone">
                @error('phone')
                <span class="invalid-feedback" role="alert">
                    <strong>{{ $message }}</strong>
                </span>
                @enderror
            </div>
        </div>
    </div>

    <div class="form-group">
        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
            name="password" required autocomplete="new-password" placeholder="{{ __("Mot de passe") }}">
        @error('password')
        <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </span>
        @enderror
    </div>

    <div class="form-group">
        <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required
            autocomplete="new-password" placeholder="{{ __("Confirmez le mot de passe") }}">
    </div>
    <div class="form-group mb-0">
        <button type="submit" class="btn btn-default">
            {{ __('Créer mon compte') }}
        </button>
    </div>
</form>

<p class="mt-3">
    <small class="Vlt-grey-darker text-muted">
        <div class="form text-sm">{{ __('En vous inscrivant, vous acceptez notre') }}
            <a href="#" target="_blank">{{ __('Termes et conditions') }}</a>.
        </div>
    </small>
</p>
@endsection

@section('second')
<div class="w-75">
    <div class="signup-backdrop-pattern"></div>
</div>
@endsection