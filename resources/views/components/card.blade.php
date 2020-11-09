<div class="card shadow-sm">
    <div class="card-header {{ isset($title) ? '' : 'd-none' }}">{{ $title ?? '' }}</div>
    <div class="card-body">
        {{ $slot }}
    </div>

    <div class="card-footer {{ isset($footer) ? '' : 'd-none' }}">{{ $footer ?? '' }}</div>
</div>