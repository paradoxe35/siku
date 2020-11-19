@extends('admin.layouts.admin')

@section('title', __("Rapport").' | ')

@section('admin-content')

<div data-controller="Rapport--Rapport">
    @include('admin.layouts.breadcrumb', ['page' => 'Rapport'])

    <h2 class="text-center">{{ __('Bientôt disponible') }}</h2>
</div>

@endsection