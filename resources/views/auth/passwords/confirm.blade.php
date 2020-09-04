@extends('auth')

@section('first')
<h1 class="display-4">{{ __('Confirmez le mot de passe') }}</h1>

<p class="text-lead">
    {{ __('Veuillez confirmer votre mot de passe avant de continuer') }}.
</p>

<form method="POST" action="{{ route('password.confirm') }}">
    @csrf
    <div class="form-group">
        <input id="password" placeholder="{{ __('Mot de passe') }}" type="password"
            class="form-control @error('password') is-invalid @enderror" name="password" required>

        @error('password')
        <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </span>
        @enderror
    </div>
    @if (Route::has('password.request'))
    <a class="btn btn-link p-0 mb-3" href="{{ route('password.request') }}">
        {{ __('Mot de passe oublié') }}?
    </a>
    @endif
    <div class="form-group">
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