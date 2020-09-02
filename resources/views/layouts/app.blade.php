<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $app_name }}</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ mix('css/style.css', 'compiled') }}" rel="stylesheet">
    @yield('style')
</head>

<body class="@yield('body-class')">
    <div id="app-main">
        @yield('content')
    </div>
    <div id="app-footer">
        @include('layouts.footer')
    </div>
    <script src="{{ mix('js/manifest.js', 'compiled') }}"></script>
    <script src="{{ mix('js/vendor.js', 'compiled') }}"></script>
    <script src="{{ mix('js/application.js', 'compiled') }}"></script>
</body>

</html>