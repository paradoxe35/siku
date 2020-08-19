@extends('layouts.app')

@section('content')
@include('layouts.nav-logo')
<div class="container my-9">
    <div class="inner text-center">
        <h1>{{ __('Bienvenue chez') }} {{ $app_name }} !</h1>
        <p>{{ __('Inscrivez-vous ou connectez-vous pour gérer vos invités et autres données connexes') }}.</p>
        <div class="form">{{ __('En vous inscrivant, vous acceptez notre') }} <a href="#"
                target="_blank">{{ __('Termes et conditions') }}</a>.
        </div>
        <div class="main-cta mt-4">
            <div class="row justify-content-center">
                <div class="col-md-3 mb-3">
                    <a href="{{ route('sign-in') }}" class="btn btn-primary btn-block">
                        <span class="btn-inner--text">{{ __("Se connecter à mon compte") }}</span>
                    </a>
                </div>
                <div class="col-md-3 mb-3">
                    <a href="{{ route('sign-up') }}" class="btn btn-icon btn-primary btn-block">
                        <span class="btn-inner--text">{{ __("Créer un compte") }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection