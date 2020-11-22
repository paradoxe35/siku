<footer class="py-5" id="footer-main">
    <div class="container d-flex  justify-content-around">
        @include('layouts.change-locale')
        <div class="row align-items-center">
            <div class="col-xl-12">
                <div class="copyright text-center text-muted">
                    ©{{now()->format('Y')}}, 
                    <a href="#" class="text-xs text-default ml-1">PNG_</a>,
                    , {{ __('Tous les droits sont réservés') }}.
                </div>
            </div>
        </div>
    </div>
    </div>
</footer>