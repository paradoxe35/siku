const mix = require('laravel-mix');
const path = require('path');

require('laravel-mix-merge-manifest');
require('laravel-mix-clean');

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

mix.react('asset/js/app.js', 'js/application.js')
    .react('asset/js/admin/admin.js', 'js/admin.js')
    .js("asset/modules/js/qrcode.js", "js/qrcode-app.js")
    .extract(['jquery', 'bootstrap', 'stimulus', '@grafikart/spinning-dots-element', 'dropify', 'codex-notifier'])
    .mergeManifest()

mix.setPublicPath('public/compiled/')
mix.setResourceRoot('/compiled/')
mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'asset/'),
            '@js': path.resolve(__dirname, 'asset/js/'),
            '@admin': path.resolve(__dirname, 'asset/js/admin'),
            '@sass': path.resolve(__dirname, 'asset/sass/'),
            '@lib': path.resolve(__dirname, 'asset/lib/'),
        }
    },
    output: {
        publicPath: '/compiled/',
    }
});


if (!mix.inProduction()) {
    mix.sourceMaps(false)
}

if (mix.inProduction()) {
    mix.clean()
    require('laravel-mix-versionhash')
    mix.versionHash({
        length: 16
    })
}

mix.disableNotifications();
mix.browserSync({
    proxy: 'localhost:8000',
    watch: true,
    files: ["./resources", "./asset"],
    notify: false,
    open: false,
    snippetOptions: {
        rule: {
            match: /<\/head>/i,
            fn: function (snippet, match) {
                return snippet + match;
            }
        }
    }
});

mix.copyDirectory('asset/img/svg', 'public/img/svg');