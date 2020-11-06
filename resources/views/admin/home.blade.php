@extends('admin.layouts.admin')

@section('title', __("Tableau de bord").' | ')

@section('admin-content')

<div data-controller="Home--Home">
    @include('admin.home.card-details')

    @include('admin.home.card-chart')

    @include('admin.home.card-latest')
</div>

@endsection