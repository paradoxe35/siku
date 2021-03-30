const mix = require('laravel-mix');
const path = require('path');

require('laravel-mix-clean');
require('laravel-mix-versionhash');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('assets/js/app.js', '')
    .js('assets/js/admin/admin.js', '')
    .react()
    .js("assets/modules/qrcode.js", '')
    .js("assets/modules/livewire-frame.js", '')
    .sass("assets/sass/app.scss", '')
    .setPublicPath('public/compiled/')
    .setResourceRoot('/compiled/')
    .options({
        terser: {
            extractComments: false,
        }
    })
    .webpackConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'assets/'),
                '@js': path.resolve(__dirname, 'assets/js/'),
                '@admin': path.resolve(__dirname, 'assets/js/admin'),
                '@sass': path.resolve(__dirname, 'assets/sass/'),
                '@lib': path.resolve(__dirname, 'assets/lib/'),
            }
        },
        output: {
            publicPath: '/compiled/',
        }
    })
    .sourceMaps(false)
    .disableNotifications()
    .extract(['jquery', 'bootstrap', 'stimulus', '@grafikart/spinning-dots-element', 'dropify', 'notify-js-lib'])
    .clean()
    .versionHash({ length: 16 });
