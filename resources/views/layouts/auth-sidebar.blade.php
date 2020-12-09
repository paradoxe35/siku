<nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light shadow-none bg-white"
    id="sidenav-main">
    <div class="scrollbar-inner">
        <div class="sidenav-header">
            <a class="navbar-brand" href="{{ route('customer.events') }}">
                <span class="h1 font-weight-bold">{{ $app_name }}</span>
                <small class="text-muted" style="font-size: .7rem">PNG_</small>
            </a>
        </div>
        <div class="navbar-inner">
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div class="nav-link">
                            <div class="balance-customer-sidebar mb-3" id="balance-customer-sidebar"
                                data-turbolinks-permanent data-controller="Customer--App--Balance">
                                <span class="optimizeLegibility">
                                    <span class="text-sm">{{ __('Balance') }}
                                        <small>({{ __('Crédit') }})</small></span><br>
                                    <b class="font-weight-bold balance">
                                        {{ $symbol }}
                                        <span data-target="Customer--App--Balance.showBalance"></span>
                                        <small data-target="Customer--App--Balance.dbalanceService"
                                            style="font-size: 0.63rem"></small>
                                    </b>
                                    <a href="{{ route('customer.event.payments') }}">
                                        <span class="upgrade-action">
                                            {{ __('Ajouter') }}
                                        </span>
                                    </a>
                                    <br>
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    @foreach ($sidebarLinkList as $key => $section)
                    @foreach ($section as $item)
                    <li class="nav-item">
                        <a class="nav-link {{ Str::contains(request()->fullUrl(), route($item['route'])) ? 'active' : '' }}"
                            href="{{ route($item['route']) }}">
                            <i class="ni ni-{{ $item['icon'] }} text-default"></i>
                            <span class="nav-link-text">{{ $item['name'] }}</span>
                        </a>
                    </li>
                    @endforeach
                    @if ($key != (count($sidebarLinkList) - 1))
                </ul>
                <hr class="my-3">
                <ul class="navbar-nav">
                    @endif
                    @endforeach
                </ul>
            </div>
        </div>
    </div>
</nav>