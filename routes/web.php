<?php

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
////
Route::get('/', function () {
    return view('vue');
})->name('root');


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home')->middleware('auth');

Route::get('logout', [\App\Http\Controllers\Api\UserController::class, 'logout']);

//Route::get('/log', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
