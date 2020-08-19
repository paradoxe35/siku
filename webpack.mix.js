const mix = require('laravel-mix');
const path = require('path');


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
    .sass('asset/sass/app.scss', 'public/bundles/css/style.css')
    .extract()

// mix.react('asset/js/admin/dashboard.js', 'public/js/dashboard.js')
// mix.sass('asset/sass/admin/dashboard.scss', 'public/css/dashboard.css')

mix.webpackConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'asset/'),
            '@js': path.resolve(__dirname, 'asset/js/'),
            '@sass': path.resolve(__dirname, 'asset/sass/'),
            '@lib': path.resolve(__dirname, 'asset/lib/'),
            // '@img': path.resolve(__dirname, 'asset/img/'),
            // '@fonts': path.resolve(__dirname, 'asset/img/fonts/'),
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