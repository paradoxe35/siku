@extends('admin.layouts.app-admin')

@section('body-class', 'no-footer custom-sidebar')

@section('content')
@include('admin.layouts.sidebar')
<div class="main-content" data-controller="Admin" id="panel">
    @include('layouts.auth-navbar')
    <div class="container-fluid mt-7">
        @yield('admin-content')
    </div>
</div>
@endsection