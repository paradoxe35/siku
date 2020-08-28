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
    .extract(['jquery', 'swup', 'bootstrap', 'stimulus', '@grafikart/spinning-dots-element', 'dropify', 'codex-notifier'])
    .mergeManifest()
mix.clean()

mix.setPublicPath('public/compiled/')
mix.setResourceRoot('/compiled/')
mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'asset/'),
            '@js': path.resolve(__dirname, 'asset/js/'),
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
    require('laravel-mix-versionhash')
    mix.versionHash({
        length: 16
    })
}

mix.options({
    hmrOptions: {
        host: '0.0.0.0',
        port: 8080
    }
})

mix.disableNotifications();
mix.browserSync({
    proxy: 'localhost:8000',
    watch: true,
    files: ["./resources", "./asset"],
    notify: false,
    open: false
});

mix.copyDirectory('asset/img/svg', 'public/img/svg');