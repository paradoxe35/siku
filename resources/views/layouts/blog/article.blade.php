<div class="card {{  isset($home) ? 'shadow-sm': 'border-none border shadow-none' }} ">
    <div class="card-body {{ isset($home) ? 'p-2': '' }}">
        <div class="row">
            <div class="col-sm-6 mb-sm-3 mb-md-0" style="height: 200px;">
                <a href="{{ route('posts.show', ['slug' => $article->slug]) }}">
                    <img class="img-thumbnail img-cover-full" src="{{ asset($article->image_url) }}"
                        alt="{{ asset($article->title) }}">
                </a>
            </div>
            <div class="col-sm-6">
                <h5 class="h3 card-title mb-2">
                    <a href="{{ route('posts.show', ['slug' => $article->slug]) }}">
                        {{ $article->title }}
                    </a>
                </h5>
                <div class="d-flex justify-content-sm-between text-xs text-muted my-2">
                    <span>{{ $article->created_at->toFormattedDateString() }}</span>
                    <span class="mr-sm-3">{{ $article->author }}</span>
                </div>
                <p class="card-text short-description">
                    {{ $article->description }}
                </p>
            </div>
        </div>
    </div>
</div>