@extends('admin.layouts.admin')

@section('title', __("Compte").' | ')

@section('admin-content')

<div data-controller="Account--Account">
    @include('admin.layouts.breadcrumb', ['page' => 'Compte'])
</div>

@endsection