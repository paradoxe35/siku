@extends('admin.layouts.admin')

@section('title', __("Clients").' | ')

@section('admin-content')

<div data-controller="Clients--Clients">
    @include('admin.layouts.breadcrumb', ['page' => 'Clients'])
</div>

@endsection