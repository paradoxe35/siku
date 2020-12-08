@extends('admin.layouts.admin')

@section('title', __("Tableau de bord").' | ')

@section('admin-content')

<div data-controller="Home--Home">
    <div class="d-flex justify-content-end mb-3">
        <a class="btn btn-sm btn-primary" data-turbolinks="false" href="/horizon">{{ __('Laravel Horizon') }}</a>
        <a class="btn btn-sm btn-primary" data-turbolinks="false" href="/telescope">{{ __('Laravel Telescope') }}</a>
    </div>

    @include('admin.home.card-details')

    @include('admin.home.card-chart')

    @include('admin.home.card-latest')
</div>

@endsection