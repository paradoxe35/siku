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
                        Route::get('', "HomeController");
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

        Route::namespace('Sales')
            ->prefix('sales')
            ->name('sales.')
            ->group(function () {
                Route::get('', "SalesController@index")->name('home');
                Route::get('{id}/', "SalesController@show")->name('show');
                Route::patch('{id}/', "SalesController@update");
                Route::delete('{id}/', "SalesController@destroy");
            });

        Route::namespace('Customers')
            ->prefix('customers')
            ->name('customers.')
            ->group(function () {
                Route::get('', "CustomersController@index")->name('home');
                Route::get('{id}/', "CustomersController@show")->name('show');
                Route::put('{id}/', "CustomersController@update")->name('update');
                Route::patch('{id}/', "CustomersController@trash")->name('trash');

                Route::get('{id}/events', "CustomersController@events")->name('events');

                Route::get('{id}/purchases', "CustomersController@purchases")->name('purchases');

                Route::get('{id}/custom-payments', "CustomersController@customPayments")->name('custom-payments');

                Route::get('{id}/low-balance', 'CustomersController@lowBalance')->name('low-balance');
                Route::post('{id}/low-balance', 'CustomersController@setLowBalance');
                Route::delete('{id}/low-balance', 'CustomersController@destoryLowBalance');
            });

        Route::namespace('Events')
            ->prefix('events')
            ->name('events.')
            ->group(function () {
                Route::get('', "EventsController@index")->name('home');
                Route::get('{id}/', "EventsController@show")->name('show');
                Route::patch('{id}/', "EventsController@trash")->name('trash');
                Route::get('{id}/templates', "EventsController@templates")->name('templates');
                Route::get('{id}/guests', "EventsController@guests")->name('guests');
                Route::get('{id}/validators', "EventsController@validators")->name('validators');
            });

        Route::name('price-balance.')
            ->prefix('price-balance')
            ->namespace('PriceBalance')
            ->group(function () {

                Route::prefix('custom-payment')
                    ->group(function () {
                        Route::get('', 'CustomPaymentController@index')->name('custom-payment');
                        Route::patch('/{id}', 'CustomPaymentController@trash')->name('custom-payment.trash');
                        Route::post('', 'CustomPaymentController@store')->name('custom-payment.store');
                        Route::get('search-client', 'CustomPaymentController@searchClient')->name('custom-payment.search-client');
                    });

                Route::prefix('default-payment')
                    ->group(function () {
                        Route::get('', 'DefaultBalanceController@index')->name('default-balance');
                        Route::post('', 'DefaultBalanceController@setBalances');
                        Route::delete('', 'DefaultBalanceController@clearBalances');
                    });

                Route::prefix('prices')
                    ->group(function () {
                        Route::get('', 'PricesController@index')->name('prices');
                        Route::post('', 'PricesController@setRevenue');
                    });

                Route::prefix('services')
                    ->group(function () {
                        Route::get('', 'ServicesController@index')->name('services');
                        Route::post('twilio/upload/csv', 'ServicesController@twilioUpload')
                            ->name('services.twilio.upload');
                    });

                Route::get('', 'PriceBalanceController@index')->name('home');
            });

        Route::namespace('Reports')
            ->prefix('reports')
            ->name('reports.')
            ->group(function () {
                Route::get('', "ReportsController@index")->name('home');
            });

        Route::namespace('Blog')
            ->prefix('blog')
            ->name('blog.')
            ->group(function () {
                Route::get('', "BlogController@home")->name('home');

                Route::get('articles', "BlogController@index")->name('index');
                Route::get('create', "BlogController@create")->name('create');
                Route::post('store', "BlogController@store")->name('store');

                Route::patch('/{id}', "BlogController@trash")->name('trash');
                Route::delete('/{id}', "BlogController@destroy")->name('destroy');

                Route::post('update/{id}', "BlogController@update")->name('update');

                Route::get('show/{id}', "BlogController@show")->name('show');
                Route::get('show/{id}/profile', "BlogController@showProfile")->name('show.profile');
                Route::get('show/{id}/content', "BlogController@showContent")->name('show.content');
                Route::get('show/{id}/comments', "BlogController@showComments")->name('show.comments');

                Route::post('store-caterory', "BlogController@storeCaterory")->name('store-caterory');
                Route::delete('store-caterory/{id}', "BlogController@destoryCaterory");
                Route::get('editor-link', "BlogController@editorLinkData")->name('editor-link');
            });

        Route::namespace('Settings')
            ->prefix('settings')
            ->name('settings.')
            ->group(function () {
                Route::get('', "SettingsController@index")->name('home');
                Route::put('account/update', "AccountController@update")->name('account.update');
                Route::put('account/update/password', "AccountController@updatePassword")->name('account.update.password');

                Route::apiResource('admins', 'AdminsController');

                Route::apiResource('agents', 'AgentsController');
                Route::apiResource('cmp-details', 'CompanyDetailsController');
            });
    });
