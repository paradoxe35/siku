@extends('layouts.app')

@section('title', __("Blog").' | ')

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="Events">
    <section id="hero">
        <div class="inner">
            <div class="container-fluid">
                <h1 class="text-center display-2">{{ __('Blog') }}</h1>
            </div>
        </div>
    </section>
</div>
@endsection