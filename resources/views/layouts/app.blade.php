<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ $app_name }}</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="{{ mix('bundles/css/style.css') }}" rel="stylesheet">
</head>

<body>
    <div id="app-ndowa">
        @yield('content')
    </div>
    @include('layouts.footer')
    <script src="{{ mix('bundles/js/manifest.js') }}"></script>
    <script src="{{ mix('bundles/js/vendor.js') }}"></script>
    <script src="{{ mix('bundles/js/application.js') }}"></script>
</body>

</html>