<div class="row {{ $classRow ?? '' }}">
    <div class="col-lg-6">
        @if (session('resent'))
        <div class="alert border border-darken-1 border-success my-2" role="alert">
            {{ __('Un nouveau lien de vérification a été envoyé à votre adresse e-mail') }}.
        </div>
        @endif
        @if (!Auth::user()->hasVerifiedEmail())
        <div class="alert alert-warning" role="alert">
            <strong>{{ __('Attention') }}!</strong>
            {{ __("Votre adresse e-mail n'a pas encore été confirmée") }}.
            <form method="POST" action="{{ route('verification.resend') }}">
                @csrf
                <button type="submit" class="btn btn-secondary btn-sm">{{ __('Envoyer un nouveau lien') }}</button>
            </form>
        </div>
        @endif
    </div>
</div>
<script type="text/javascript">
    window.confirmed_email = {{ Auth::user()->hasVerifiedEmail() ? 1 : 0 }}
</script>