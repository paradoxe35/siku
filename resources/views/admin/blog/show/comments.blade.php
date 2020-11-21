@extends('admin.blog.show')

@section('blog-show-content')
<x-card>
    <div class="row justify-content-center">
        <div class="col-lg-8">
            <script async src="https://comments.app/js/widget.js?3" data-page-id="{{ $article->id }}"
                data-comments-app-website="OP9qIB4d" data-limit="10" data-color="5E72E4" data-dislikes="1"></script>
        </div>
    </div>
</x-card>
@endsection