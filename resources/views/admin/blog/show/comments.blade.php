@extends('admin.blog.show')

@section('blog-show-content')
<x-card>
    <div class="row justify-content-center">
        <div class="col-lg-8">
            @include('layouts.telegram-comments', ['pageId' => $article->id ])
        </div>
    </div>
</x-card>
@endsection