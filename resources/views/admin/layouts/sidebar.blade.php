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
                    @foreach ([
                    [
                    'name' => 'Acceuil',
                    'icon' => 'chart-pie-35',
                    'route' => ''
                    ],
                    [
                    'name' => 'Prix et balance',
                    'icon' => 'spaceship',
                    'route' => ''
                    ],
                    [
                    'name' => 'Clients',
                    'icon' => 'collection',
                    'route' => ''
                    ],
                    [
                    'name' => 'Achat',
                    'icon' => 'air-baloon',
                    'route' => ''
                    ],
                    [
                    'name' => 'Rapport',
                    'icon' => 'books',
                    'route' => ''
                    ],
                    [
                    'name' => 'Articles',
                    'icon' => 'ruler-pencil',
                    'route' => ''
                    ],
                    [
                    'name' => 'Compte',
                    'icon' => 'circle-08',
                    'route' => ''
                    ],
                    ] as $item)
                    <li class="nav-item">
                        <a class="nav-link {{ Str::contains(request()->url(), $item['route']) ? 'active' : '' }}" href="{{ $item['route'] }}">
                            <i class="ni ni-{{ $item['icon'] }} text-default"></i>
                            <span class="nav-link-text">{{ __($item['name']) }}</span>
                        </a>
                    </li>
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</nav>