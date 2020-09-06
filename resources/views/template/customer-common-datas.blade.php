<script type="text/javascript">
    window.auth = @json(Auth::user());
    window.customerBalance = @json([
        'balance' => Auth::user()->balance()
    ]);
    window.customerEvent = @json($event ?? null);
</script>