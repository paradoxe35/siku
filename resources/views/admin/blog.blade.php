@extends('admin.layouts.admin')

@section('title', __("Blog").' | ')

@section('admin-content')

<div data-controller="Blog--Blog">
    @include('admin.layouts.breadcrumb', ['page' => 'Blog'])
    <div class="pt-3">
        <x-nav-tab :isTab="false" :links="[
            ['name' => 'Articles', 'route' => 'admin.blog.index'],
            ['name' => 'Créer Article', 'route' => 'admin.blog.create'],
        ]" />
    </div>
    <div class="my-3">
        @yield('blog-content')
    </div>
</div>

@endsection