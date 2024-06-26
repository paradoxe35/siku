@extends('admin.layouts.app-admin')

@section('body-class', 'no-footer custom-sidebar')

@section('navbar-title')
<form class="navbar-search navbar-search-light form-inline mr-sm-3" id="navbar-search-main">
    <div class="form-group mb-0">
        <div class="input-group input-group-alternative input-group-merge">
            <div class="input-group-prepend">
                <span class="input-group-text">
                    <svg width="15" height="15" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310.42 310.42">
                        <path
                            d="M273.587 214.965c49.11-49.111 49.109-129.021 0-178.132-49.111-49.111-129.02-49.111-178.13 0C53.793 78.497 47.483 140.462 76.51 188.85c0 0 2.085 3.498-.731 6.312l-64.263 64.263c-12.791 12.79-15.836 30.675-4.493 42.02l1.953 1.951c11.343 11.345 29.229 8.301 42.019-4.49l64.128-64.128c2.951-2.951 6.448-.866 6.448-.866 48.387 29.026 110.352 22.717 152.016-18.947zM118.711 191.71c-36.288-36.288-36.287-95.332.001-131.62 36.288-36.287 95.332-36.288 131.619 0 36.288 36.287 36.288 95.332 0 131.62-36.288 36.286-95.331 36.286-131.62 0z" />
                        <path
                            d="M126.75 118.424c-1.689 0-3.406-.332-5.061-1.031-6.611-2.798-9.704-10.426-6.906-17.038 17.586-41.559 65.703-61.062 107.261-43.476 6.611 2.798 9.704 10.426 6.906 17.038-2.799 6.612-10.425 9.703-17.039 6.906-28.354-11.998-61.186 1.309-73.183 29.663-2.099 4.959-6.913 7.938-11.978 7.938z" />
                        </svg>
                </span>
            </div>
            <input class="form-control" placeholder="{{ __('Recherche') }}" type="text">
        </div>
    </div>
    <button type="button" class="close" data-action="search-close" data-target="#navbar-search-main" aria-label="Close">
        <span aria-hidden="true">×</span>
    </button>
</form>
@endsection

@section('content')
@include('admin.layouts.sidebar')
<div class="main-content" data-controller="Admin" id="panel">
    @include('layouts.auth-navbar')
    <div class="container-fluid mt-7 mb-7">
        @yield('admin-content')
    </div>
</div>
@endsection