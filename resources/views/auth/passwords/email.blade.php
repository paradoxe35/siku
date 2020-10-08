@extends('auth')

@section('first')
<h1 class="display-4">{{ __('Réinitialiser le mot de passe') }}</h1>
<p class="text-lead">
    {{ __('Veuillez saisir votre adresse e-mail') }}.
    {{ __('Vous recevrez un lien pour créer un nouveau mot de passe par e-mail') }}.
</p>
@if (session('status'))
<div class="alert border border-darken-1 border-success my-2" role="alert">
    {{ session('status') }}.
</div>
@endif
<form method="POST" action="{{ route('password.email') }}">
    @csrf
    <div class="form-group my-4">
        <input id="email" type="email" placeholder="{{ __('E-Mail Adresse') }}"
            class="form-control @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required>
        @error('email')
        <span class="invalid-feedback" role="alert">
            <strong>{{ $message }}</strong>
        </span>
        @enderror
    </div>
    <div class="form-group  mb-0">
        <button type="submit" class="btn btn-default">
            {{ __('Envoyer le lien') }}
        </button>
    </div>
</form>
@endsection


@section('second')
<div class="mt-9"></div>
<div class="signin-backdrop-pattern"></div>
@endsection