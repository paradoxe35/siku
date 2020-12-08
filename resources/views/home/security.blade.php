<section class="py-6">
    <div class="container">
        <div class="row row-grid  justify-content-center">
            <div class="col-md-4 order-md-2 col-6">
                @include('template.svg.protected')
            </div>
            <div class="col-md-6 order-md-1 mt-md-6">
                <div class="pr-md-5">
                    <h1>{{ __("Securité") }} & Validation</h1>
                    <p>{{ $app_name }}
                        {{ __("est livré avec une application mobile et autres équipements destinés à vous aider dans le processus de validation d'invitations") }}.
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