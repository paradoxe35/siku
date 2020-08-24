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
        <div class="alert alert-secondary alert-dismissible fade show bg-white" role="alert">
            <span class="alert-text">
                <div class="checklist-item checklist-item-danger">
                    <div class="checklist-info">
                        <h6 class="checklist-title mb-0">
                            <span class="alert-icon">Erreur</span>
                        </h6>
                        <ul>
                            <li>10:30 AM</li>
                            <li>10:30 AM</li>
                        </ul>
                    </div>
                </div>
            </span>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

    </div>
</div>
@endsection