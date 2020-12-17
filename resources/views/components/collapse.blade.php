<div class="card border border-darken shadow-none">
    <div class="card-header" id="heading-{{ $id }}" data-toggle="collapse" data-target="#collapse-{{ $id }}"
        aria-expanded="{{ $expanded }}" aria-controls="collapse-{{ $id }}">
        <h5 class="mb-0">{{ $title }}</h5>
    </div>
    <div id="collapse-{{ $id }}" class="collapse {{ $expanded ? 'show': '' }}"
        aria-labelledby="heading-{{ $id }}" data-parent="{{ $parentId }}">
        <div class="card-body">
            {{ $slot }}
        </div>
    </div>
</div>