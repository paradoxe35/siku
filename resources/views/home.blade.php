@extends('layouts.app')

@section('content')
@include('layouts.navbar')
<div class="home-hero">
    <section id="hero">
        <div class="inner">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-12 col-md-5 offset-md-1">
                        <div class="main-content">
                            <h1>{{ __('Informer et distribuer vos invitations en un temps record') }}</h1>
                            <h4>
                                {{ __("Le meilleur et plus sûr moyen d'inviter vos membres et connaissances à vos événements") }}.
                            </h4>
                            <a href="{{ route('get-started') }}" class="btn btn-icon btn-primary mt-3">
                                <span class="nav-link-inner--text">{{ __('Commencer') }}</span>
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

<section class="pb-9 bg-white">
    <div class="container">
        <div class="row justify-content-center text-center">
            <div class="col-md-8">
                <h2 class="display-3">{{ __('Comment ça marche') }}?</h2>
                <p class="lead">
                  {{ $app_name  }} 
                  {{ __('est un tout nouveau produit basé sur une structure de distribution d\'annonces intuitive qui vise à la rendre plus réactifs et bien sûr beaucoup plus faciles à gérer') }}.
                  {{ 'Laissez' }}
                  {{ $app_name  }} 
                  {{ __('vous fournir ses fonctionnalités intéressantes et ses outils de validation, qui vous aménagera bien') }}.
                </p>
            </div>
        </div>
    </div>
</section>
<section class="section section-lg pt-lg-0 mt--7">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card card-lift--hover shadow border-0">
                            <div class="card-body py-5">
                                <div class="text-center text-md-left">
                                    <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                        @include('template.svg.sms')
                                    </div>
                                    <h4 class="h3 text-default text-uppercase">{{ __("SMS") }}</h4>
                                </div>
                                <p class="description mt-3">Argon is built on top of the most popular open source
                                    toolkit for developing with HTML, CSS, and JS.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card card-lift--hover shadow border-0">
                            <div class="card-body py-5">
                                <div class="text-center text-md-left">
                                    <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                        @include('template.svg.whatsapp')
                                    </div>
                                    <h4 class="h3 text-default text-uppercase">{{ __("WhatsApp") }}</h4>
                                </div>
                                <p class="description mt-3">Use Argons's included npm and gulp scripts to compile source
                                    code, run tests, and more with just a few simple commands.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card card-lift--hover shadow border-0">
                            <div class="card-body py-5">
                                <div class="text-center text-md-left">
                                    <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                        @include('template.svg.qr-code')
                                    </div>
                                    <h4 class="h3 text-default text-uppercase">{{ __("QR Code") }}</h4>
                                </div>
                                <p class="description mt-3">Argon makes customization easier than ever before. You get
                                    all the tools to make your website building process a breeze.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="py-6">
    <div class="container">
        <div class="row row-grid  justify-content-center">
            <div class="col-md-4 order-md-2 col-6">
                @include('template.svg.protected')
            </div>
            <div class="col-md-6 order-md-1 mt-md-6">
                <div class="pr-md-5">
                    <h1>{{ __("Securité") }} & Validation</h1>
                    <p>{{ $app_name }} {{ __("est livré avec une application mobile et autres équipements destinés à vous aider dans le processus de validation d'invitations") }}.
                    </p>
                    <ul class="list-unstyled mt-5">
                        <li class="py-2">
                            <div class="d-flex align-items-center">
                                <div>
                                    <div class="badge badge-circle mr-3">
                                        @include('template.svg.gear')
                                    </div>
                                </div>
                                <div>
                                    <h4 class="mb-0">{{ __('Soigneusement conçu') }}</h4>
                                </div>
                            </div>
                        </li>
                        <li class="py-2">
                            <div class="d-flex align-items-center">
                                <div>
                                    <div class="badge badge-circle mr-3">
                                        @include('template.svg.playstore')
                                    </div>
                                </div>
                                <div>
                                    <h4 class="mb-0">{{ __("Trouver l'application sur") }} <a href="#"
                                            class="text-primary">PlayStore</a></h4>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</section>
<section class="py-7">
    <div class="container">
        <div class="row row-grid justify-content-center">
            <div class="col-lg-8 text-center">
                <h2 class="display-3">{{ __("C'est cool, n'est-ce pas") }}?</h2>
                <p class="lead">Cause if you do, it can be yours now. Hit the button below to navigate to get the free
                    version or purchase a license for your next project. Build a new web app or give an old Bootstrap
                    project a new look!
                </p>
            </div>
        </div>
    </div>
</section>
@endsection