@if ($articles->count() > 0)
<section>
    <div class="container">
        <div class="row row-grid justify-content-center">
            <div class="col-lg-10">
                <h2 class="display-5 mb-4">{{ __("Les derniers articles") }}</h2>
                <div class="row">
                    @foreach ($articles as $article)
                    <div class="col-lg-6">
                        @include('layouts.blog.article', ['article' => $article, 'home' => true])
                    </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</section>
@endif