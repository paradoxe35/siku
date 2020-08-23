{{-- <header id="header" class="blue">
    <nav id="navbar-main" data-controller="Navbar"
        class="navbar navbar-horizontal navbar-expand-md navbar-light fixed-top">
        <div class="container-fluid mx-md-4 mx-lg-5 pl-lg-4">
            <a class="navbar-brand" href="{{ route('home') }}">
<h1>{{ $app_name }}</h1>
</a>
</div>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav align-items-center  ml-auto ml-md-0 ">
        <li class="nav-item dropdown">
            <a class="nav-link pr-0" href="#" role="button" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <div class="media align-items-center">
                    <span class="avatar avatar-sm rounded-circle">
                        <img alt="Image placeholder"
                            src="https://demos.creative-tim.com/argon-dashboard-pro/assets/img/theme/team-4.jpg">
                    </span>
                    <div class="media-body  ml-2  d-none d-lg-block">
                        <span class="mb-0 text-sm  font-weight-bold">John Snow</span>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</div>
</nav>
</header> --}}

<header id="header" class="blue">
    <nav data-controller="Navbar"
        class="navbar {{ $top ?? 'navbar-top' }} navbar-expand navbar-expand-md navbar-light fixed-top">
        <div class="container-fluid {{ isset($top) ? 'mx-md-4 mx-lg-5 pl-lg-4' : '' }}">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <a class="navbar-brand" href="{{ route('home') }}">
                    <h1>{{ $app_name }}</h1>
                </a>
                <ul class="navbar-nav align-items-center ml-md-auto">
                    @if (!isset($top))
                    <li class="nav-item d-xl-none">
                        <div class="pr-3 sidenav-toggler sidenav-toggler-dark" data-action="sidenav-pin"
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
                <ul class="navbar-nav align-items-center  ml-auto ml-md-0 ">
                    <li class="nav-item">
                        <div class="media align-items-center">
                            <span class="avatar avatar-sm rounded-circle">
                                <i class="ni ni-circle-08"></i>
                            </span>
                            <div class="media-body  ml-2  d-none d-lg-block">
                                <span class="mb-0 text-sm  font-weight-bold">John Snow</span>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item mx-3">
                        <div class="media align-items-center">
                            <div class="media-body ml-2 d-none d-lg-block">
                                <i class="ni ni-fat-remove"></i>
                            </div>
                            <span class="mb-0 text-sm  font-weight-bold">{{ __('Déconnexion') }}</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>