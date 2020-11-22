@extends('layouts.app')

@section('title', __("Blog").' - '. $article->title .' | ')

@section('seometa')
<meta property="og:type" content="article">
<meta property="og:title" content="{{ $article->title }}">
<meta property="og:description" content="{{ $article->description }}">
<meta property="og:image" content="{{ asset($article->image_url) }}">
<meta name="twitter:image" content="{{ asset($article->image_url) }}">
<meta name="twitter:title" content="{{ $article->title }}">
<meta name="twitter:author" content="{{ '@'.$article->author  }}">
@endsection

@section('content')
@include('layouts.navbar')
<div class="main-content" data-controller="Blog-Show">
    @include('layouts.hero', ['title' => $article->title,
    'display' => 'display-3', 'container' => 'container col-lg-6'])
    <div class="container">
        <div class="row justify-content-center mt--9">
            <div class="col-lg-8">
                <div class="card ">
                    <img class="card-img-top" src="{{ asset($article->image_url) }}" alt="Image placeholder">
                    <div class="card-body my-0 py-0"></div>
                </div>
                <x-card>
                    <div class="d-flex justify-content-sm-between text-xs text-muted my-2">
                        <span>
                            {{ $article->created_at->toFormattedDateString() }} -
                            {{ $article->author }}
                        </span>
                    </div>
                    <div class="mb-5 acticle-blog" data-target="Blog-Show.content"></div>
                </x-card>
                <x-card>
                    @include('layouts.telegram-comments', ['pageId' => $article->id ])
                </x-card>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    window.article_json = JSON.parse(@json($article->json))
</script>
@endsection