<header id="header" class="blue">
    <nav id="navbar-main" data-controller="Navbar"
        class="navbar navbar-horizontal navbar-expand-md navbar-light fixed-top">
        <div class="container-fluid mx-lg-8 pl-0">
            <a class="navbar-brand" href="{{ route('home') }}">
                <h1>{{ $app_name }}</h1>
            </a>
            <div class="sidenav-toggler d-xl-none d-lg-none d-md-none active " type="button" data-toggle="collapse"
                data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false"
                aria-label="Toggle navigation">
                <div class="sidenav-toggler-inner">
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                    <i class="sidenav-toggler-line"></i>
                </div>
            </div>
            <div class="navbar-collapse navbar-custom-collapse collapse" id="navbar-collapse">
                <div class="navbar-collapse-header">
                    <div class="row">
                        <div class="col-6 collapse-brand">
                            <h1>{{ $app_name }}</h1>
                        </div>
                        <div class="col-6 collapse-close">
                            <button type="button" class="navbar-toggler" data-toggle="collapse"
                                data-target="#navbar-collapse" aria-controls="navbar-collapse" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <span></span>
                                <span></span>
                            </button>
                        </div>
                    </div>
                </div>
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a href="{{ route('pricing') }}" class="nav-link">
                            <span class="nav-link-inner--text">{{ __('Tarification') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('faq') }}" class="nav-link">
                            <span class="nav-link-inner--text">{{ __('FAQ') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{ route('posts') }}" class="nav-link">
                            <span class="nav-link-inner--text">{{ __('Blog') }}</span>
                        </a>
                    </li>
                    <li class="nav-item d-xl-none d-lg-none d-md-none">
                        <a href="{{ route('contact-us') }}" class="nav-link">
                            <span class="nav-link-inner--text">{{ __('Nous contacter') }}</span>
                        </a>
                    </li>
                </ul>
                <hr class="d-lg-none">
                <ul class="navbar-nav align-items-lg-center ml-lg-auto">
                    <li class="nav-item d-none d-lg-block d-md-block ml-lg-4">
                        <a href="{{ route('contact-us') }}" class="btn btn-neutral btn-icon">
                            <span class="nav-link-inner--text">{{ __('Nous contacter') }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>