@extends('auth')

@section('title', __("Se connecter").' | ')

@section('first')
<div class="signin-container" data-controller="Auth--SigninOrAuth">
    <h1 class="display-4">{{ __('Bienvenue encore') }}!</h1>
    <p class="text-lead">
        {{ __("Vous n'avez pas encore de compte") }}? <a href="{{ route('sign-up') }}">{{ __("S'inscrire") }}</a>.
    </p>
    <div data-target="Auth--SigninOrAuth.innerError"></div>
    <form data-action="Auth--SigninOrAuth#action" method="POST" action="{{ route('sign-in') }}">
        @csrf
        <div class="form-group">
            <input id="email" type="email" placeholder="{{ __('E-Mail Adresse') }}" class="form-control d-block"
                name="email" value="{{ old('email') }}" required>
        </div>

        <div class="form-group">
            <input type="password" id="password" placeholder="{{ __('Mot de passe') }}" class="form-control d-block"
                name="password" required>
        </div>
        @if (Route::has('password.request'))
        <a class="btn btn-link p-0 mb-3" href="{{ route('password.request') }}">
            {{ __('Mot de passe oublié') }}?
        </a>
        @endif

        <div class="form-group mb-0">
            <button type="submit" class="btn btn-default">
                {{ __('Se connecter') }}
            </button>
        </div>
    </form>
</div>
@endsection


@section('second')
<div class="mt-9"></div>
<div class="signin-backdrop-pattern"></div>
@endsection