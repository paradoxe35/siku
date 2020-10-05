<?php

use App\Http\Middleware\Customer\SetValueForCustomerEventUrls;
use Illuminate\Http\Request;
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

                                Route::post('events/{event}/guests/sendall', "EventGuestsController@sendall")
                                    ->name('events.guests.sendall');

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

                        Route::namespace('Payments')
                            ->name('payments.')
                            ->group(function () {
                                Route::get('link-page', "PaymentsController@customerPaymentLinkPage")->name('link-page');
                                Route::post('custom-payment-validate', "PaymentsController@customPaymentValidate")
                                    ->name('custom-payment-validate');
                            });
                    });
            });
        Route::get('country-pricing', "PricingController@getByCountry")->name('country-pricing');
        Route::apiResource('customer-request', 'ContactUsController')->only([
            'index', 'store', 'destroy'
        ]);
        Route::apiResource('cmp-details', "CompanyDetailsController")->except(['show']);
    });
