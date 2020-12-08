<div class="home-hero">
    <section id="hero">
        <div class="inner">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-5 offset-md-1">
                        <div class="main-content">
                            <h1>{{ __('Informer et distribuer vos invitations en un temps record') }}</h1>
                            <h4>
                                {{ $app_description }}.
                            </h4>
                            <a href="{{ route('get-started') }}" class="btn btn-icon btn-primary mt-3">
                                <span class="nav-link-inner--text">{{ __('Créer un compte gratuit') }}</span>
                            </a>
                        </div>
                    </div>
                    <div class="col-12 col-md-6 col-lg-6">
                        <aside class="secondary-content">
                            @include('template.svg.ndowa1')
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>