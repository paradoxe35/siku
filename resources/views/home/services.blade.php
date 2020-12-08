<section class="section section-lg pt-lg-0 mt--7">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-12">
                <div class="row">
                    <div class="col-lg-4">
                        <div class="card card-lift--hover shadow border-0" style="height: 350px">
                            <div class="card-body py-5">
                                <div class="text-center text-md-left">
                                    <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                        @include('template.svg.sms')
                                    </div>
                                    <h4 class="h3 text-default text-uppercase">{{ __("SMS") }}</h4>
                                </div>
                                <p class="description mt-3">
                                    {{ __('Créer un monde connecté en envoyant des milliers de SMS en un seul clic. International, fluide et à bon prix.') }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card card-lift--hover shadow border-0" style="height: 350px">
                            <div class="card-body py-5">
                                <div class="text-center text-md-left">
                                    <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                        @include('template.svg.mail')
                                    </div>
                                    <h4 class="h3 text-default text-uppercase">{{ __("Mail") }}</h4>
                                </div>
                                <p class="description mt-3">
                                    {{ $app_name }}
                                    {{ __("vous donne la possibilité d’un moyen d'envoi. Le partage des images, fichiers cadrant avec la validation d’un invité.") }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4">
                        <div class="card card-lift--hover shadow border-0" style="height: 350px">
                            <div class="card-body py-5">
                                <div class="text-center text-md-left">
                                    <div class="icon icon-shape bg-gradient-default text-white rounded-circle mb-4">
                                        @include('template.svg.qr-code')
                                    </div>
                                    <h4 class="h3 text-default text-uppercase">{{ __("QR Code") }}</h4>
                                </div>
                                <p class="description mt-3">
                                    {{ __("La sécurité de vos événements reste primordiale avec un système d'encodage QR code.") }}
                                    {{ $app_name }}
                                    {{ __("vous offre un choix pour vérifier et valider vos invités via une application mobile.") }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>