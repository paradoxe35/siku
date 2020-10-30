@extends('layouts.app')

@section('title', __("Services").' | ')

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="Services">
    <section id="hero">
        <div class="inner">
            <div class="container-fluid">
                <h1 class="text-center display-2">{{ __('Services') }}</h1>
            </div>
        </div>
    </section>
</div>
@endsection