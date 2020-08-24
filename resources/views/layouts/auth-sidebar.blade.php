<nav class="sidenav navbar navbar-vertical fixed-left navbar-expand-xs navbar-light shadow-none bg-white"
    id="sidenav-main">
    <div class="scrollbar-inner">
        <div class="sidenav-header">
            <a class="navbar-brand">
                <span class="h1 font-weight-bold">{{ $app_name }}</span>
                <small class="text-muted" style="font-size: .7rem">PNG_</small>
            </a>
        </div>
        <div class="navbar-inner">
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <div class="nav-link">
                            <div class="balance-customer-sidebar mb-3">
                                <span class="optimizeLegibility">
                                    <span class="text-sm">{{ __('Balance') }}</span><br>
                                    <b class="font-weight-bold balance">$ 0.77</b>
                                    <a href="#">
                                        <span class="upgrade-action">
                                            {{ __('Ajouter') }}
                                        </span>
                                    </a>
                                    <br>
                                </span>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="">
                            <i class="ni ni-archive-2 text-default"></i>
                            <span class="nav-link-text">{{ __('Produit') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="">
                            <i class="ni ni-collection text-default"></i>
                            <span class="nav-link-text">{{ __('Modèles') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="">
                            <i class="ni ni-spaceship text-default"></i>
                            <span class="nav-link-text">{{ __('Utilisation') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="">
                            <i class="ni ni-books text-default"></i>
                            <span class="nav-link-text">{{ __('Rapport') }}</span>
                        </a>
                    </li>
                </ul>
                <hr class="my-3">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="">
                            <i class="ni ni-settings-gear-65 text-default"></i>
                            <span class="nav-link-text">{{ __('Paramètres') }}</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="">
                            <i class="ni ni-single-02 text-default"></i>
                            <span class="nav-link-text">{{ __('Compte') }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>