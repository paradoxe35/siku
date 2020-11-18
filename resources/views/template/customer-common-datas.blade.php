<script type="text/javascript">
    window.auth = @json(Auth::user());
    window.auth.hash = "{{ Auth::user()->hashId() }}";
    window.chatUrls = {
        chatIndex: "{{ route('api.customer.chat.index') }}",
        chatPriority: "{{ route('api.customer.chat.priority') }}",
        chatStore: "{{ route('api.customer.chat.store') }}",
        chatAgent: "{{ route('api.customer.chat.agent') }}"
    };
    window.customerBalance = @json([
        'balance' => Auth::user()->balance()
    ]);
    window.customerEvent = @json($event ?? null);
</script>