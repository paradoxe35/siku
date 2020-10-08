@extends('auth')

@section('first')
<h1 class="display-4">{{ __('Réinitialiser le mot de passe') }}</h1>

<form method="POST" action="{{ route('password.update') }}">
    @csrf
    <input type="hidden" name="token" value="{{ $token }}">

    <div class="form-group">
        <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
            value="{{ $email ?? old('email') }}" placeholder="{{ __('E-Mail Adresse') }}" required>
        @error('email')
        <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </span>
        @enderror
    </div>

    <div class="form-group">
        <input id="password" type="password" placeholder="{{ __('Mot de passe') }}"
            class="form-control @error('password') is-invalid @enderror" name="password" required>
        @error('password')
        <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </span>
        @enderror
    </div>

    <div class="form-group">
        <input id="password-confirm" placeholder="{{ __('Confirmez le mot de passe') }}" type="password"
            class="form-control" name="password_confirmation" required>
    </div>

    <div class="form-group mb-0">
        <button type="submit" class="btn btn-default">
            {{ __('Confirmer') }}
        </button>
    </div>
</form>
@endsection

@section('second')
<div class="mt-9"></div>
<div class="signin-backdrop-pattern"></div>
@endsection