<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::namespace('API')
    ->name('api.')
    ->prefix('web')
    ->group(function () {
        Route::middleware('auth:api')
            ->group(function () {
                Route::namespace('Customer')
                    ->prefix('customer')
                    ->name('customer.')
                    ->group(function () {
                        Route::namespace('Event')
                            ->group(function () {

                                //events controller
                                Route::put('events/{event}/set-qr-code-logo', 'EventsController@setQcodeLogo')
                                    ->name('events.set-qr-code-logo');

                                Route::get('events/{event}/in-queue-process', "EventsController@inQueueProcess")
                                    ->name('events.in-queue-process');

                                Route::apiResource('events', 'EventsController');

                                //templates controller
                                Route::apiResource('events.templates', "EventTemplatesController")
                                    ->except(['update', 'show']);

                                //validators controller
                                Route::apiResource('events.validators', "EventValidatorController")
                                    ->except(['update', 'show']);

                                //guest controller
                                Route::post('events/{event}/guests/{guest}/send', "EventGuestsController@send")
                                    ->name('events.guests.send');

                                Route::post('events/{event}/guests/import-from-common', "EventGuestsController@importFromCommon")
                                    ->name('events.guests.import-from-common');

                                Route::post('events/{event}/guests/sendall', "EventGuestsController@sendall")
                                    ->name('events.guests.sendall');

                                Route::delete('events/{event}/guests', "EventGuestsController@destroyAll")
                                    ->name('events.guests.destroy.all');

                                Route::apiResource('events.guests', "EventGuestsController")
                                    ->except(['update', 'show']);

                                //profile controller
                                Route::get('events/{event}/profile', "EventProfileController@profile")
                                    ->name('events.event.profile');

                                Route::get('events/{event}/profile/items', "EventProfileController@profileItems")
                                    ->name('events.event.profile.items');

                                //report controller
                                Route::get('events/{event}/report/overview', "EventReportController@overview")
                                    ->name('events.event.report.overview');

                                Route::get('events/{event}/report/attended', "EventReportController@attended")
                                    ->name('events.event.report.attended');

                                Route::get('events/{event}/report/absent', "EventReportController@absent")
                                    ->name('events.event.report.absent');

                                Route::get('events/{event}/report/download', "EventReportController@download")
                                    ->withoutMiddleware(['api', 'auth:api'])
                                    ->middleware(['web', 'auth'])
                                    ->name('events.event.report.download');
                            });

                        Route::prefix('account')
                            ->name('account.')
                            ->group(function () {
                                Route::put('/update', 'AccountController@update')->name('update');
                                Route::patch('/update/phone', 'AccountController@updatePhone')->name('update.phone');
                                Route::put('/update/password', 'AccountController@updatePassword')->name('update.password');
                            });

                        //templates controller
                        Route::apiResource('common-guests', "CommonGuestsController")
                            ->except(['update', 'show']);

                        Route::namespace('Payments')
                            ->name('payments.')
                            ->prefix('payments')
                            ->group(function () {
                                Route::get('link-page', "PaymentsController@customerPaymentLinkPage")->name('link-page');
                                Route::prefix('{event}')
                                    ->group(function () {
                                        Route::post('custom-payment-validate', "PaymentsController@customPaymentValidate")
                                            ->name('custom-payment-validate');

                                        Route::post('pay-data', "PaymentsController@payData")
                                            ->withoutMiddleware(['api', 'auth:api'])
                                            ->middleware(['web', 'auth'])
                                            ->name('pay-data');

                                        // paypal transaction
                                        Route::post('create-paypal-transaction', "PaymentsController@createPaypalTransaction")
                                            ->name('create-paypal-transaction');

                                        Route::post('get-paypal-transaction', "PaymentsController@getPaypalTransaction")
                                            ->name('get-paypal-transaction');

                                        Route::prefix('history')
                                            ->name('history.')
                                            ->group(function () {
                                                Route::get('index', 'PaymentsHistoryController@index')
                                                    ->withoutMiddleware(['api', 'auth:api'])
                                                    ->middleware(['web', 'auth', 'throttle:60,1'])
                                                    ->name('index');

                                                Route::get('low-balance', 'PaymentsHistoryController@lowBalance')
                                                    ->name('low-balance');
                                                Route::post('low-balance', 'PaymentsHistoryController@setLowBalance');
                                                Route::delete('low-balance', 'PaymentsHistoryController@destoryLowBalance');
                                            });
                                    });
                            });

                        Route::prefix('chat')
                            ->name('chat.')
                            ->group(function () {
                                Route::get('index', 'ChatController@index')->name('index');
                                Route::post('priority', 'ChatController@priority')->name('priority');
                                Route::post('store', 'ChatController@store')->name('store');
                                Route::get('agent', 'ChatController@agent')->name('agent');
                            });
                    });
            });
        Route::get('country-pricing', "PricingController@getByCountry")->name('country-pricing');
        Route::apiResource('customer-request', 'ContactUsController')->only([
            'index', 'store', 'destroy'
        ]);
        Route::apiResource('cmp-details', "CompanyDetailsController")->except(['show']);

        Route::middleware(['auth:api', 'admin'])
            ->prefix('dash')
            ->name('admin.')
            ->namespace('Admin')
            ->group(function () {
            });
    });

Route::namespace('Mobile')
    ->name('api.mobile.')
    ->prefix('mobile')
    ->group(function () {
        Route::namespace('Auth')
            ->group(function () {
                Route::post('token', 'AuthenticationController@token');

                Route::middleware(['auth:sanctum'])
                    ->group(function () {
                        Route::post('destroy-token', 'AuthenticationController@destroyToken');
                        Route::get('user', 'AuthenticationController@user')->middleware('active-event');
                    });
            });

        Route::middleware(['auth:sanctum', 'active-event'])
            ->group(function () {
                Route::get('event', "GetEventController");
                Route::prefix('{event}')
                    ->namespace('Event')
                    ->group(function () {
                        Route::get('guests', 'GuestsController@index');
                        Route::get('attends', 'GuestsController@attends');

                        //validation
                        Route::post('validation', 'ValidationController@validation');
                    });
            });
    });
