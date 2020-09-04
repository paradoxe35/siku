@extends('layouts.app')

@section('body-class', 'no-footer')

@section('content')
@include('layouts.nav-logo')
<div class="container-fluid pl-0">
    <div class="row">
        <div class="col-md-6 col-12">
            <div class="card unauthenticated-content mb-0">
                <div class="card-body">
                    <div class="mt-9">
                        <div class="row justify-content-center">
                            <div class="col-md-10">
                                @yield('first')
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-6 d-none d-md-block">
            @yield('second')
        </div>
    </div>
</div>
@endsection