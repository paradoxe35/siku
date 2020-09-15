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
        }

        .align .place {
            width: 90vh;
            height: 90vh;
        }
    </style>
</head>
<body>
    <div class="align">
        <div class="place">
            <canvas id="qrcode" {{ $event->qrcode_logo ? 'data-logo='.asset($event->qrcode_logo).'' : '' }}
                data-code="{{ $code }}" style="overflow: hidden" />
        </div>
    </div>
    <script src="{{ mix('js/manifest.js', 'compiled') }}" defer></script>
    <script src="{{ mix('js/qrcode-app.js', 'compiled') }}"></script>
</body>
</html>