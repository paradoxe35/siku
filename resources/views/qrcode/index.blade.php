<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>code</title>
    <style>
        .align {
            display: flex;
            justify-content: center;
            align-content: center;
            width: 100%;
            height: 100%;
        }

        .align .place {
            width: 90vh;
            height: 90vh;
        }

        .align .full {
            width: 100vh;
            height: 100vh;
        }

        .body {
            width: 100%;
            height: 100%;
            margin: 0;
            padding: 0;
        }
    </style>
</head>

<body class="body">
    <button onclick="downloadImage()">{{ __('Download') }}</button>
    <div class="align">
        <div class="{{ request('full') ? 'full': 'place' }}">
            <canvas id="qrcode" data-logo="{{ $event->qr_code_path }}" data-code="{{ $code }}"
                style="overflow: hidden" />
        </div>
        <img id="image" style="display: none">
    </div>
    @include('assets.assets', [
        'entries' => 'DEV_SERVER_QRCODE_ENTRIES',
        'assets' => [
            ['tag' => 'script', 'src' => 'manifest.js'],
            ['tag' => 'script', 'src' => 'qrcode.js'],
        ]
    ])
</body>

</html>