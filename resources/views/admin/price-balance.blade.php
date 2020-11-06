@extends('admin.layouts.admin')

@section('title', __("Prix et balance").' | ')

@section('admin-content')

<div data-controller="PriceBalance--Price-Balance">
    @include('admin.layouts.breadcrumb', ['page' => 'Prix et balance'])
</div>

@endsection