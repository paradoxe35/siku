@extends('layouts.app')

@section('body-class', 'no-footer custom-sidebar')

@section('content')
@include('layouts.auth-sidebar')
<div class="main-content" data-controller="Admin-Customer" id="panel">
    @include('layouts.auth-navbar')
    <div class="container-fluid my-7">
        @yield('customer-content')
    </div>
</div>
@include('template.customer-common-datas')
@endsection