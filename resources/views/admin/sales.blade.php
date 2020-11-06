@extends('admin.layouts.admin')

@section('title', __("Ventes").' | ')

@section('admin-content')

<div data-controller="Sales--Sales">
    @include('admin.layouts.breadcrumb', ['page' => 'Ventes'])
</div>

@endsection