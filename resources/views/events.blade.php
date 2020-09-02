@extends('layouts.app')

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="Events">
    <section id="hero">
        <div class="inner">
            <div class="container-fluid">
                <h1 class="text-center display-2">{{ __('Événements') }}</h1>
            </div>
        </div>
    </section>
</div>
@endsection