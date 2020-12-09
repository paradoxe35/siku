<nav data-controller="Navbar"
    style="transition: none"
    class="navbar {{ $top ?? 'navbar-top' }} navbar-expand navbar-expand-md navbar-light fixed-top main-content-nav">
    <div class="container-fluid {{ isset($top) ? 'mx-md-4 mx-lg-5 pl-lg-4' : '' }}">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            @if (!isset($top))
                @if (!isset($customer_event))
                    <a class="navbar-brand d-sm-block d-md-none" href="{{ route('home') }}">
                        <h1>{{ $app_name }}</h1>
                    </a>
                @else
                    <a class="navbar-brand d-sm-block d-md-none" href="{{ route('customer.events') }}">
                        <h1>{{ $app_name }}</h1>
                    </a>
                @endif
            @else
            <a class="navbar-brand" href="{{ route('home') }}">
                <h1>{{ $app_name }}</h1>
            </a>
            @endif

            <div class="d-none d-md-block">
                @yield('navbar-title')
            </div>

            @if (isset($customer_event))
            <div class="progress-wrapper pt-1 d-none" data-controller="Customer--App--Show-Sending"
                data-Customer--App--Show-Sending-status-fetch="{{ route('api.customer.events.in-queue-process') }}"
                data-Customer--App--Show-Sending-show-class="d-md-block" id="send-poucentage" data-turbolinks-permanent>
                <div class="progress-info">
                    <div class="progress-label">
                        <span class="" style="font-size: 0.625rem;border-radius: 0;">
                            {{ __('Envoi') }}
                        </span>
                    </div>
                    <div class="progress-percentage ml-2">
                        <span><span data-target="Customer--App--Show-Sending.pourcentage"></span>%</span>
                    </div>
                </div>
                <div class="progress mb-1" style="height: 3px">
                    <div data-target="Customer--App--Show-Sending.progress" class="progress-bar bg-default" role="progressbar" aria-valuenow="60" aria-valuemin="0"
                        aria-valuemax="100" style="width: 0%;"></div>
                </div>
            </div>
            @endif

            <ul class="navbar-nav align-items-center ml-md-auto">
                @if (!isset($top))
                <li class="nav-item d-xl-none">
                    <div class="sidenav-toggler d-xl-none d-lg-none d-md-none active" data-action="sidenav-pin"
                        data-target="#sidenav-main">
                        <div class="sidenav-toggler-inner">
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                            <i class="sidenav-toggler-line"></i>
                        </div>
                    </div>
                </li>
                @endif
            </ul>
            <ul class="navbar-nav align-items-center  ml-auto ml-md-0">
                <li class="nav-item mr-3">
                    @include('layouts.change-locale')
                </li>
                <li class="nav-item d-none d-md-block">
                    <a class="text-decoration-none text-default"
                        href="{{ !empty($event) ? route('customer.event.account'): 'javascript:;' }}">
                        <div class="media align-items-center">
                            <span class="avatar avatar-sm rounded-circle avatar-xs">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <div class="media-body ml-2 d-none d-md-block">
                                <span class="mb-0 text-xs font-weight-bold">{{ Auth::user()->name }}</span>
                            </div>
                        </div>
                    </a>
                </li>
                <li class="nav-item mx-3">
                    <div class="media align-items-center">
                        <div class="media-body ml-2 d-none d-md-block">
                            <i class="ni ni-fat-remove"></i>
                        </div>
                        <div data-controller="Auth--SigninOrAuth" data-Auth--SigninOrAuth-type="logout">
                            <button type="submit" data-action="Auth--SigninOrAuth#action"
                                data-url="{{ route('logout') }}"
                                class="btn btn-link mb-0 p-0 text-xs text-default font-weight-bold ">
                                {{ __('Déconnexion') }}
                            </button>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</nav>