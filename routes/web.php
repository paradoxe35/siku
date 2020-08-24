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

Route::view('/', 'home')->name('home');

Route::view('/pricing', 'pricing')->name('pricing');

Route::view('/get-started', 'get-started')->name('get-started');

Route::view('/sign-in', 'auth.sign-in')->name('sign-in');

Route::view('/sign-up', 'auth.sign-up')->name('sign-up');

Route::prefix('customer')
    ->name('customer.')
    ->group(function () {
        Route::view('get-started', 'customer-config')->name('config');
        Route::prefix('uuid')
            ->group(function () {
                Route::view('/', 'customer')->name('home');
            });
    });
