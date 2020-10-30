@extends('admin.layouts.admin')

@section('admin-content')

<div data-controller="Home--Home">
    @include('admin.home.card-details')

    @include('admin.home.card-chart')
</div>

@endsection