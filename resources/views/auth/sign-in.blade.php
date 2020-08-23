@extends('auth')

@section('first')
<h1>{{ __('Bienvenue encore') }}!</h1>
<p class="text-lead">
    {{ __("Vous n'avez pas encore de compte? ") }}
    <a href="{{ route('sign-up') }}">{{ __("S'inscrire") }}</a>.
</p>

<form method="POST" action="{{ route('sign-in') }}">
    @csrf
    <div class="form-group">
        <input id="email" type="email" placeholder="{{ __('E-Mail Adresse') }}"
            class="form-control d-block @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}"
            required autocomplete="email" autofocus>
        @error('email')
        <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </span>
        @enderror
    </div>

    <div class="form-group">
        <input id="password" placeholder="{{ __('Mot de passe') }}" type="password"
            class="form-control @error('password') is-invalid @enderror" name="password" required
            autocomplete="current-password">
        @error('password')
        <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </span>
        @enderror
    </div>
    <a class="btn btn-link p-0 mb-3" href="#">
        {{ __('Mot de passe oublié') }}?
    </a>

    <div class="form-group mb-0">
        <button type="submit" class="btn btn-default">
            {{ __('Se connecter') }}
        </button>
    </div>
</form>
@endsection


@section('second')
<div class="mt-9"></div>
<div class="signin-backdrop-pattern"></div>
@endsection