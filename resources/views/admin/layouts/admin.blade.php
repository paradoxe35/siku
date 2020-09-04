@extends('layouts.app')

@section('body-class', 'no-footer admin-s')

@section('style')
<style>
    @media (min-width: 768px) {
        .admin-s.g-sidenav-pinned .sidenav.fixed-left+.main-content {
            margin-left: 250px !important;
        }

        .admin-s.g-sidenav-pinned .sidenav.fixed-right+.main-content {
            margin-right: 250px !important;
        }
    }

    @media (max-width: 576px) {
        .admin-s .sidenav.navbar.shadow-none {
            box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
        }
    }

    .admin-s .navbar-vertical.navbar-expand-xs .navbar-nav>.nav-item>.nav-link.active {
        color: #131415;
        font-weight: 600;
    }
</style>
@endsection

@section('content')
@include('admin.layouts.sidebar')
<div class="main-content" data-controller="Admin-Customer" id="panel">
    @include('layouts.auth-navbar')
    <div class="container-fluid mt-7">
        @yield('admin-content')
    </div>
</div>
@endsection