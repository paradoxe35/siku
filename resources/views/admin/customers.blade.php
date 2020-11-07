@extends('admin.layouts.admin')

@section('title', __("Clients").' | ')

@section('admin-content')

<div data-controller="Customers--Customers">
    @include('admin.layouts.breadcrumb', ['page' => 'Clients'])
    <div class="my-3">
        @yield('customers-content')
    </div>
</div>

@endsection