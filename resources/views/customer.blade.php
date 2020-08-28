@extends('layouts.app')

@section('style')
<style>
    #footer-main {
        display: none;
    }

    @media (min-width: 768px) {
        .g-sidenav-pinned .sidenav.fixed-left+.main-content {
            margin-left: 250px !important;
        }

        .g-sidenav-pinned .sidenav.fixed-right+.main-content {
            margin-right: 250px !important;
        }
    }

    @media (max-width: 576px) {
        .sidenav.navbar.shadow-none {
            box-shadow: 0 0 2rem 0 rgba(136, 152, 170, 0.15) !important;
        }
    }

    .navbar-vertical.navbar-expand-xs .navbar-nav>.nav-item>.nav-link.active {
        color: #131415;
        font-weight: 600;
    }
</style>
@endsection

@section('content')
@include('layouts.auth-sidebar')
<div class="main-content" data-controller="Customer" id="panel">
    @include('layouts.auth-navbar')
    <div class="container-fluid mt-7">
        @yield('customer-content')
    </div>
</div>
@endsection