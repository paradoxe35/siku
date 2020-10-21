@extends('auth')

@section('first')
<h1>{{ __('Vérifiez votre adresse e-mail') }}</h1>

@if (session('resent'))
<div class="alert border border-darken-1 border-success my-2" role="alert">
    {{ __('Un nouveau lien de vérification a été envoyé à votre adresse e-mail') }}.
</div>
@endif

<p>
    <span>{{ request('customer_name') }}!</span>, <span>{{ __('Votre compte à bien été créé') }}.</span><br>
    <span>{{ __('Avant de continuer, veuillez vérifier votre e-mail pour un lien de vérification') }}</span>.
</p>
<p>{{ __("Si vous n'avez pas reçu l'e-mail") }}.</p>
<form class="d-inline" method="POST" action="{{ route('verification.resend') }}">
    @csrf
    <button type="submit"
        class="btn btn-default align-baseline">{{ __('Cliquez ici pour en demander un autre') }}</button>.
</form>

<p class="mt-3">
    <small class="Vlt-grey-darker text-muted">
        <div class="form text-sm">{{ __('Plus tard') }}
            <a href="{{ route('customer.events') }}">{{ __('Accueil') }}</a>.
        </div>
    </small>
</p>
@endsection

@section('second')
<div class="signup-backdrop-pattern"></div>
@endsection