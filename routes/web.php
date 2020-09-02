<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', 'HomeController')->name('home');
Route::get('/pricing', 'PricingController')->name('pricing');
Route::get('/events', 'EventsController')->name('events');
Route::get('/services', 'ServicesController')->name('services');
Route::get('/contact-us', 'ContactUsController')->name('contact-us');

Route::group([], function () {
    Route::get('/get-started', 'GetStartedController')->name('get-started');
    Route::namespace('Auth')
        ->group(function () {
            Route::get('/sign-in', 'LoginController@showLoginForm')->name('sign-in');
            Route::post('/sign-in', 'LoginController@login');
            Route::get('/sign-up', 'RegisterController@showRegistrationForm')->name('sign-up');
            Route::post('/sign-up', 'RegisterController@register');
        });
});

Route::post('locale', 'LocalizeController@changeLang')->name('locale');

Route::prefix('customer')
    ->namespace('Customer')
    ->name('customer.')
    ->group(function () {
        Route::get('events', 'ConfigController@index')->name('config');
        Route::prefix('{event}')
            ->group(function () {
                Route::get('/product', 'ProductController@index')->name('product');
                Route::get('/models', 'ModelsController@index')->name('models');
                Route::get('/utilization', 'UtilizationController@index')->name('utilization');
                Route::get('/report', 'ReportController@index')->name('report');
                Route::get('/settings', 'SettingsController@index')->name('settings');
                Route::get('/account', 'AccountController@index')->name('account');
            });
    });

Route::namespace('Admin')
    ->prefix('dash')
    ->name('admin.')
    // ->middleware(['auth', 'admin'])
    ->group(function () {
        Route::redirect('', 'home');
        Route::get('home', 'HomeDashController@index')->name('home');
    });
