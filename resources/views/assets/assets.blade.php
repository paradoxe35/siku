@if (env('DEV_MODE'))

    @isset($react)
    <script type="module">
        import RefreshRuntime from "http://{{ env('DEV_SERVER') }}/@react-refresh"
        RefreshRuntime.injectIntoGlobalHook(window) 
        window.$RefreshReg$ = () => {}
        window.$RefreshSig$ = () => (type) => type
        window.__vite_plugin_react_preamble_installed__ = true
      </script>
    @endisset

    @foreach (explode(',', env($entries)) as $entry)
        @if ($entry)
        <script type="module" src="//{{ env('DEV_SERVER') }}/{{ $entry }}" ></script>
        @endif
    @endforeach

@else

    @foreach ($assets as $asset)
        @if ($asset['tag'] == 'link')
            <link href="{{ mix($asset['src'], 'compiled') }}" data-turbolinks-track="reload" rel="stylesheet"/>
        @endif

        @if ($asset['tag'] == 'script')
            <script src="{{ mix($asset['src'], 'compiled') }}" data-turbolinks-track="reload" defer></script>
        @endif
    @endforeach

@endif