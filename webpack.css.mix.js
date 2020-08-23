const mix = require('laravel-mix');
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

mix.sass('asset/sass/app.scss', 'public/bundles/css/style.css')
    .mergeManifest()

if (mix.inProduction()) {
    mix.version();
}

mix.webpackConfig({
    resolve: {
        alias: {
            '@sass': path.resolve(__dirname, 'asset/sass/'),
            '@lib': path.resolve(__dirname, 'asset/lib/'),
        }
    },
});

mix.disableNotifications();