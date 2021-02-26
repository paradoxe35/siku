<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $app_name }}</title>
    @livewireStyles
    <style type="text/css">
        html,
        body {
            margin: 0 !important;
            padding: 0 !important;
            width: 100%;
            overflow: hidden;
        }

        .button {
            padding: 0.25rem 0.5rem;
            font-size: 0.675rem;
            color: #fff;
            border-radius: 0.2rem;
            background-color: #bcac76;
            border-color: #bcac76;
            display: inline-block;
            font-weight: 400;
            line-height: 1.5;
            text-align: center;
            text-decoration: none;
            vertical-align: middle;
            cursor: pointer;
            user-select: none;
            border: 1px solid transparent;
            transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        }

        .button.info {
            background-color: #31afc9;
            border-color: #31afc9;
        }
    </style>
</head>

<body>
    @livewireScripts
    <script src="{{ mix('js/manifest.js', 'compiled') }}"></script>
    <script src="{{ mix('js/livewire-frame.js', 'compiled') }}"></script>

    @livewire($component, $attribute)

</body>

</html>