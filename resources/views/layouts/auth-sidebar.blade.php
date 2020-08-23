<nav class="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white" id="sidenav-main">
    <div class="scrollbar-inner">
        <div class="sidenav-header  d-flex  align-items-center">
            <a class="navbar-brand text-primary font-weight-900 " style="font-size: 1.5rem" href="">
                IBC
            </a>
            <div class=" ml-auto ">
                <div class="sidenav-toggler d-none d-xl-block" data-action="sidenav-unpin" data-target="#sidenav-main">
                    <div class="sidenav-toggler-inner">
                        <i class="sidenav-toggler-line"></i>
                        <i class="sidenav-toggler-line"></i>
                        <i class="sidenav-toggler-line"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="navbar-inner">
            <div class="collapse navbar-collapse" id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#navbar-tables" data-toggle="collapse" role="button"
                            aria-expanded="false" aria-controls="navbar-tables">
                            <i class="ni ni-archive-2 text-green"></i>
                            <span class="nav-link-text">{{ __('Salaires') }}</span>
                        </a>
                        <div class="collapse" id="navbar-tables">
                            <ul class="nav nav-sm flex-column">
                                <li class="nav-item">
                                    <a href="" class="nav-link">
                                        <span class="sidenav-mini-icon"> T </span>
                                        <span class="sidenav-normal"> {{ __('Recherche') }} </span>
                                    </a>
                                    <a class="nav-link">
                                        <span class="sidenav-mini-icon"> T </span>
                                        <span class="sidenav-normal"> {{ __('Salaire') }} </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#navbar-maps" data-toggle="collapse" role="button"
                            aria-expanded="false" aria-controls="navbar-maps">
                            <i class="ni ni-books text-primary"></i>
                            <span class="nav-link-text">{{ __('Rapport') }}</span>
                        </a>
                        <div class="collapse" id="navbar-maps">
                            <ul class="nav nav-sm flex-column">
                                <li class="nav-item">
                                    <a href="" class="nav-link">
                                        <span class="sidenav-mini-icon"> G </span>
                                        <span class="sidenav-normal"> {{ __('Fiche Paie') }} </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="" class="nav-link">
                                        <span class="sidenav-mini-icon"> B </span>
                                        <span class="sidenav-normal"> {{ __('List IPR') }} </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="" class="nav-link">
                                        <span class="sidenav-mini-icon"> B </span>
                                        <span class="sidenav-normal"> {{ __('Emploiyée') }} </span>
                                    </a>
                                </li>
                                <li class="nav-item">
                                    <a href="" class="nav-link">
                                        <span class="sidenav-mini-icon"> B </span>
                                        <span class="sidenav-normal"> {{ __('Salaires') }} </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="../../pages/calendar.html">
                            <i class="ni ni-calendar-grid-58 text-red"></i>
                            <span class="nav-link-text">Calendrier</span>
                        </a>
                    </li>
                </ul>
                <hr class="my-3">
                <h6 class="navbar-heading p-0 text-muted">
                    <span class="docs-normal">Paramètre</span>
                    <span class="docs-mini">D</span>
                </h6>
                <ul class="navbar-nav mb-md-3">
                    <li class="nav-item">
                        <a class="nav-link" href="" target="_blank">
                            <i class="ni ni-spaceship"></i>
                            <span class="nav-link-text">Data</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</nav>