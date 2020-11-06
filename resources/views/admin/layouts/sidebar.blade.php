<nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light shadow-none bg-white"
    id="sidenav-main">
    <div class="scrollbar-inner">
        <div class="sidenav-header">
            <a class="navbar-brand">
                <span class="h1 font-weight-bold">{{ $app_name }}</span>
                <small class="text-muted" style="font-size: .7rem">Admin</small>
            </a>
        </div>
        <div class="navbar-inner">
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    @foreach ($adminSidebarLinkList as $item)
                    @if ($item['route'])
                    <li class="nav-item">
                        <a class="nav-link {{ Str::contains(request()->url(),  route($item['route'])) ? 'active' : '' }}"
                            href="{{  route($item['route']) }}">
                            <i class="ni ni-{{ $item['icon'] }} text-default"></i>
                            <span class="nav-link-text">{{ __($item['name']) }}</span>
                        </a>
                    </li>
                    @endif
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</nav>