<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>@yield('title')</title>
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <style>
        html,
        body {
            font-family: Poppins, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
                Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
                sans-serif;
        }
        .error-page[data-v-4afff2df] {
            height: 97vh;
            transition: 0.5s;
            color: #172b4d;
            display: flex;
            position: relative;
            z-index: 10;
            overflow: hidden;
            background-color: #fff;
        }
        @media (min-width: 0) {
            .error-page[data-v-4afff2df] {
                flex-direction: column;
            }
        }
        @media (min-width: 860px) {
            .error-page[data-v-4afff2df] {
                flex-direction: row;
            }
        }
        @media (min-width: 0) {
            .error-page .container[data-v-4afff2df] {
                width: calc(100% - 80px);
                height: 100%;
                margin: 52px 40px 0;
            }
        }
        @media (min-width: 860px) {
            .error-page .container[data-v-4afff2df] {
                width: 1100px;
                height: 376px;
                margin: 0 100px;
                background-repeat: no-repeat;
                background-position: 100% 100%;
                background-size: auto 55%;
            }
        }
        @media (min-width: 1200px) {
            .error-page .container.error-image-3[data-v-4afff2df] {
                background-position: 100%;
                background-size: auto 100%;
            }
        }
        @media (min-width: 0) {
            .error-page .container .main[data-v-4afff2df] {
                height: auto;
            }
        }
        @media (min-width: 860px) {
            .error-page .container .main[data-v-4afff2df] {
                height: 100%;
            }
        }
        .error-page .container .main .status[data-v-4afff2df] {
            font-size: 70px;
            font-weight: 700;
            line-height: 71px;
            letter-spacing: -3px;
            text-transform: uppercase;
            color: #172b4d;
        }
        .error-page .container .main .text[data-v-4afff2df] {
            width: 100%;
            max-width: 680px;
            text-transform: uppercase;
            font-style: normal;
            font-weight: 700;
            margin-top: 6px;
            color: #fff;
            word-wrap: break-word;
            -webkit-text-stroke-width: 1.5px;
            -webkit-text-stroke-color: #000;
        }
        @media (min-width: 0) {
            .error-page .container .main .text[data-v-4afff2df] {
                font-size: 40px;
                line-height: 64px;
            }
        }
        @media (min-width: 860px) {
            .error-page .container .main .text[data-v-4afff2df] {
                font-size: 70px;
                line-height: 80px;
            }
        }
        .error-page .container .main .button[data-v-4afff2df] {
            height: 53px;
            border-radius: 100px;
        }
        @media (min-width: 0) {
            .error-page .container .main .button[data-v-4afff2df] {
                width: 100%;
                margin-top: 22px;
            }
        }
        @media (min-width: 860px) {
            .error-page .container .main .button[data-v-4afff2df] {
                width: 173px;
            }
        }
        .error-page .container .main .button .icon[data-v-4afff2df] {
            width: 14px;
            height: 20px;
            fill: #fff;
            margin-right: 7px;
        }
        @media (min-width: 860px) {
            .error-page .mobile-spacer[data-v-4afff2df] {
                display: none;
            }
        }
        .error-page .image-block[data-v-4afff2df] {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 40px;
        }
        @media (min-width: 0) {
            .error-page .image-block[data-v-4afff2df] {
                max-height: calc(100% - 410px);
                height: calc(100% - 410px);
            }
        }
        @media (min-width: 860px) {
            .error-page .image-block[data-v-4afff2df] {
                display: none;
            }
        }
        @media (min-width: 0) {
            .error-page .image-block img[data-v-4afff2df] {
                width: 100%;
                height: 100%;
                max-height: 100%;
                -o-object-fit: contain;
                object-fit: contain;
            }
        }
        .center {
            justify-content: center;
            align-items: center;
        }
        @media (min-width: 860px) {
            .error-page .image-block img[data-v-4afff2df] {
                display: none;
            }
        }
        .button.black {
            background-color: #172b4d;
            color: #fff;
        }
        .button {
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: #1a1a1a;
            font-size: 14px;
            padding: 7px 16px;
            border-radius: 6px;
            background-color: #fff;
            text-decoration: none;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div data-v-4afff2df class="error-page center">
        <div data-v-4afff2df class="container error-image-3">
            <div data-v-4afff2df class="main column">
                <div data-v-4afff2df class="status">@yield('code').</div>
                <div data-v-4afff2df class="text">@yield('message')</div>
                <div data-v-4afff2df class="spacer"></div>
                <a href="{{ route('home') }}" data-v-4afff2df class="button black">
                    <span data-v-4afff2df class="icon">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                            id="arrowLeft">
                            <path
                                d="M11.0771 16.3628L6.55078 11.7778L11.0771 7.2002L12.0586 8.23291L9.17285 11.0527H17.4492V12.5103H9.17285L12.0586 15.3228L11.0771 16.3628Z">
                            </path>
                        </svg>
                    </span>
                    <span data-v-4afff2df>{{ __('Acceuil') }}</span>
                </a>
            </div>
        </div>
        <div data-v-4afff2df class="mobile-spacer spacer"></div>
    </div>
</body>
</html>