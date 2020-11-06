@extends('admin.layouts.admin')

@section('title', __("Événements").' | ')

@section('admin-content')

<div data-controller="Events--Events">
    @include('admin.layouts.breadcrumb', ['page' => 'Événements'])
</div>

@endsection