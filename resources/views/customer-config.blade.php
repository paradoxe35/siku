@extends('layouts.app')

@section('style')
<style>
    #footer-main {
        display: none;
    }
</style>
@endsection

@section('content')
@include('layouts.auth-navbar', ['top' => true])
<div class="main-content customer-settings">
    <div class="container-fluid">
        <div class="blur--section mt-6">
            <div class="icons-container blur-item text-center d-none d-md-block">
                <h1>{{ $app_name }} {{ __('Configuration') }}</h1>
                <div id="personnal-settings"></div>
                <div class="card-status"></div>
            </div>
            <div class="blur-content mt-6">
                <div class="row justify-content-center">
                    <div class="col-12 col-md-6" data-controller="Customer--Customer-Config">
                        <div class="card bg-transparent shadow-none">
                            <div class="card-body text-center">
                                <spinning-dots style="width:50px;stroke-width:8px;color: #5e72e4;" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

@endsection