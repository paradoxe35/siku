@extends('layouts.app')

@section('title', __("Services").' | ')

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="Services">
    @include('layouts.hero', ['title' => 'Services'])
</div>
@endsection