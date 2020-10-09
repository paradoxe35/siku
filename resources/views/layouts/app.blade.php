<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $app_name }}</title>
    <meta name="site-name" content="{{ $app_name }}" />
    <link href="{{ mix('css/style.css', 'compiled') }}" rel="stylesheet">
    <link href="{{ mix('css/module.css', 'compiled') }}" rel="stylesheet">
    @yield('head-meta')
    @yield('head-secondary')
    <script src="{{ mix('js/manifest.js', 'compiled') }}" defer></script>
    <script src="{{ mix('js/vendor.js', 'compiled') }}" defer></script>
    <script src="{{ mix('js/application.js', 'compiled') }}" defer></script>
    <meta name="turbolinks-cache-control" content="no-cache">
</head>

<body class="@yield('body-class')">
    <div id="app-main">
        <script>
            window.symbol = @json($symbol) 
        </script>
        @yield('content')
    </div>
    @include('layouts.footer')
</body>

</html>