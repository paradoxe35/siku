@extends('admin.layouts.admin')

@section('title', __("Blog").' | ')

@section('admin-content')

<div data-controller="Blog--Blog">
    @include('admin.layouts.breadcrumb', ['page' => 'Blog'])
    <div class="my-3">
        @yield('blog-content')
    </div>
</div>

@endsection