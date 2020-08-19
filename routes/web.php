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

Route::get('/', function () {
    return view('home');
})->name('home');

Route::get('/pricing', function () {
    return view('pricing');
})->name('pricing');

Route::get('/get-started', function () {
    return view('get-started');
})->name('get-started');

Route::get('/sign-in', function () {
    return view('auth.sign-in');
})->name('sign-in');

Route::get('/sign-up', function () {
    return view('auth.sign-up');
})->name('sign-up');
