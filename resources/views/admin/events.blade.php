@extends('admin.layouts.admin')

@section('title', __("Événements").' | ')

@section('admin-content')

<div data-controller="Events--Events">
    @include('admin.layouts.breadcrumb', ['page' => 'Événements'])
    <div class="my-3">
        @yield('events-content')
    </div>
</div>

@endsection