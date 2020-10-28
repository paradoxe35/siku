<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>@yield('title'){{ $app_name }}</title>
    <meta name="site-name" content="{{ $app_name }}" />
    <meta name="lang" content="{{ app()->getLocale() }}" />
    <!-- section:seometa -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="{{ $app_name }}">
    <meta property="og:title" content="{{ $app_name }}">
    <meta property="og:description" content="{{ $app_description }}">
    <meta property="og:image" content="">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="{{ '@'.$app_name }}">
    <meta name="twitter:creator" content="{{ $app_name }}">
    <link href="{{ mix('css/style.css', 'compiled') }}" rel="stylesheet">
    <link href="{{ mix('css/module.css', 'compiled') }}" rel="stylesheet">
    @yield('head-meta')
    @yield('head-secondary')
    <meta name="ws-host" content="{{ env('WS_HOST') }}">
    <meta name="ws-port" content="{{ env('WS_PORT') }}">
    <meta name="turbolinks-cache-control" content="no-cache">
    <script src="{{ mix('js/manifest.js', 'compiled') }}" defer></script>
    <script src="{{ mix('js/vendor.js', 'compiled') }}" defer></script>
    <script src="{{ mix('js/'. ($app_file ?? 'application.js'), 'compiled') }}" data-turbolinks-track="reload" defer>
    </script>
</head>

<body class="@yield('body-class')">
    <div id="app-main">
        <script type="text/javascript"> window.symbol = @json($symbol); </script>
        @yield('content')
    </div>
    @include('layouts.footer')
   
</body>

</html>