@extends('admin.layouts.admin')

@section('title', __("Prix et balance").' | ')

@section('admin-content')

<div data-controller="PriceBalance--Price-Balance">
    <div class="row align-items-center py-4">
        <div class="col-lg-6 col-7">
            <h6 class="h2 text-default d-inline-block mb-0">{{ __('Prix et balance') }}</h6>
            {{-- <nav aria-label="breadcrumb" class="d-none d-md-inline-block ml-md-4">
                <ol class="breadcrumb breadcrumb-links breadcrumb-dark">
                    <li class="breadcrumb-item"><a href="#"><i class="fas fa-home"></i></a></li>
                    <li class="breadcrumb-item active text-default" aria-current="page">Cards</li>
                </ol>
            </nav> --}}
        </div>
    </div>
</div>

@endsection