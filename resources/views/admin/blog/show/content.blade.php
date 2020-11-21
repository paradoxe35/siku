@extends('admin.blog.show')

@section('blog-show-content')
<div data-controller="Blog--Article-Content">
    <div class="card">
        <div class="card-img-top" style="height: 350px;">
            <img class="img-cover-full" src="{{ asset($article->image) }}" alt="Image placeholder">
        </div>
        <div class="card-body">
            <h3 class="card-title mb-3">{{ $article->title }}</h3>
            <div class="my-5 acticle-blog" data-target="Blog--Article-Content.content">

            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    window.article_json = JSON.parse(@json($article->json))
</script>
@endsection