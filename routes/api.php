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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('API')
    ->name('api.')
    ->group(function () {
        Route::middleware('auth:api')
            ->group(function () {
                Route::namespace('Customer')
                    ->prefix('customer')
                    ->name('customer.')
                    ->group(function () {
                        Route::apiResource('events', 'EventsController');
                        Route::apiResource('events.templates', "EventTemplatesController");

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
