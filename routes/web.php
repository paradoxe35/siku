<?php

use App\Http\Middleware\Customer\SetValueForCustomerEventUrls;
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
Route::get('/events', 'PostsController')->name('posts');
Route::get('/services', 'ServicesController')->name('services');
Route::get('/contact-us', 'ContactUsController')->name('contact-us');

Auth::routes(['login' => false, 'regiter' => false, 'verify' => true, 'reset' => true, 'confirm' => true]);

Route::get('/g/{event}/{code}', 'QrCodeController')->name('qrcode');

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

Route::middleware(['auth'])
    ->namespace('Customer')
    ->name('customer.')
    ->prefix('customer')
    ->group(function () {
        Route::get('events', 'EventsController@index')->name('events');
        Route::prefix('{event}')
            ->middleware(SetValueForCustomerEventUrls::class)
            ->group(function () {
                Route::name('event')
                    ->group(function () {
                        Route::namespace('Event')
                            ->group(function () {
                                Route::get('/product', 'ProductController@index')->name('.product');
                                Route::get('/utilization', 'UtilizationController@index')->name('.utilization');
                                Route::get('/report', 'ReportController@index')->name('.report');
                                Route::get('/settings', 'SettingsController@index')->name('.settings');
                            });
                        Route::get('/account', 'AccountController@index')->name('.account');
                        Route::get('/account/password', 'AccountController@password')->name('.account.password');
                        Route::get('', fn () => redirect(route('customer.event.product')));
                        //payment routes

                        Route::namespace('Payments')
                            ->prefix('payments')
                            ->group(function () {
                                Route::get('', "PaymentsController@index")->name('.payments');
                                Route::get('/new', "PaymentsController@new")->name('.payments.new');
                                Route::get('/new/pay', "PaymentsController@pay")->name('.payments.new.pay');
                            });
                    });
            });
    });


Route::namespace('Webhooks')
    ->prefix('hooks')
    ->group(function () {
        Route::post('{token}/webhook', 'TelegramController');
    });


Route::middleware(['auth', 'admin'])
    ->prefix('dash')
    ->name('admin.')
    ->namespace('Admin')
    ->group(function () {
        Route::redirect('', '/dash/home');
        Route::get('home', 'HomeController@index')->name('home');
    });
