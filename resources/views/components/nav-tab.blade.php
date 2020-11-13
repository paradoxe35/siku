<div class="nav-tabs--header">
    <ul class="nav nav-tabs custom-nav-tabs" id="tabs-icons-text" role="tablist">
        @foreach ($links as $link)
        <li class="nav-item">
            @if ($isTab)
            <a href="#{{ $link['href'] }}" class="nav-link {{ isset($link['default']) ?  'active' : '' }}"
                data-toggle="tab" role="tab" aria-controls="{{ $link['href'] }}"
                aria-selected="{{ boolval(isset($link['default'])) }}">{{ __($link['name']) }}</a>
            @else
            <a href="{{ $link['href'] }}"
                class="nav-link {{ Str::contains(request()->fullUrl(), route($item['href'])) ? 'true' : 'false' }}"
                data-toggle="tab" role="tab" aria-controls="{{ $link['href'] }}"
                aria-selected="{{ Str::contains(request()->fullUrl(), route($item['href'])) ? 'true' : 'false' }}">{{ __($link['name']) }}</a>

            @endif
        </li>
        @endforeach
    </ul>
</div>
<script type="text/javascript">
    const activeNav = document.querySelector('.nav-tabs--header .nav-item .active')
        activeNav && activeNav.scrollIntoView({ inline: "center" });
</script>