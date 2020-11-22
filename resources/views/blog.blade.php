@extends('layouts.app')

@section('title', __("Blog").' | ')

@section('content')
@include('layouts.navbar')
<div class="main-content">
    @include('layouts.hero', ['title' => 'Blog'])
    <div class="container">
        <div class="row justify-content-center mt--9">
            <div class="col-lg-8">
                @foreach ($articles as $article)
                    @include('layouts.blog.article', ['article' => $article])
                @endforeach
            </div>
        </div>
        <div class="mt-3 d-flex justify-content-center">
            {{ $articles->withQueryString()->links() }}
        </div>
    </div>
</div>
@endsection