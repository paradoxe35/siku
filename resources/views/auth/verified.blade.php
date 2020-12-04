@extends('auth')

@section('title', __("Vérifiez votre adresse e-mail").' | ')

@section('first')
<h1>{{ __("Vérifier l'adresse e-mail") }}</h1>

<div class="alert border border-darken-1 border-success my-2" role="alert">
    {{ __('Nous avons vérifié votre adresse e-mail') }}.
</div>

<a href="{{ route('customer.events') }}" class="btn btn-default align-baseline">
    {{ __("Mes événements") }}
</a>
@endsection

@section('second')
<div class="signup-backdrop-pattern"></div>
@endsection