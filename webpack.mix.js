const mix = require('laravel-mix');
const path = require('path');

require('laravel-mix-merge-manifest');

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

mix.react('asset/js/app.js', 'public/bundles/js/application.js')
    .extract(['jquery', 'swup', 'bootstrap', 'stimulus', '@grafikart/spinning-dots-element', 'dropify', 'codex-notifier'])
    .mergeManifest()

mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'asset/'),
            '@js': path.resolve(__dirname, 'asset/js/'),
            '@sass': path.resolve(__dirname, 'asset/sass/'),
            '@lib': path.resolve(__dirname, 'asset/lib/'),
        }
    },
});

if (!mix.inProduction()) {
    mix.sourceMaps(false)
}

if (mix.inProduction()) {
    mix.version();
}

mix.disableNotifications();
mix.browserSync({
    proxy: 'localhost:8000',
    watch: true,
    files: ["./resources", "./asset"],
    notify: false,
    open: false
});

mix.copyDirectory('asset/img/svg', 'public/img/svg');