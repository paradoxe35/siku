<footer class="py-5" id="footer-main">
    <div class="container d-flex  justify-content-around">
        <select class=" form-control-sm form-control w-auto d-inline-block " data-controller="Footer"
            data-Footer-locale="{{ route('locale') }}">
            @foreach ($langs as $lang)
            <option value="{{ $lang['value'] }}" {{ App::getLocale() == $lang['value']  ? 'selected': '' }}>
                {{ $lang['name'] }}</option>
            @endforeach
        </select>
        <div class="row align-items-center">
            <div class="col-xl-12">
                <div class="copyright text-center text-muted">
                    © {{now()->format('Y')}}, <a href="#" class="font-weight-bold ml-1">PNG_</a>,
                    , {{ __('Tous les droits sont réservés') }}.
                </div>
            </div>
        </div>
    </div>
    </div>
</footer>