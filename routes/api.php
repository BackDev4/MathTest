<?php

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

Route::middleware('auth:sanctum')->get('/users', function (Request $request) {
    return $request->user();
});

Route::get('/me', [\App\Http\Controllers\Api\UserController::class, 'authUser'])->name('authUser');

Route::apiResources([
    "users" => \App\Http\Controllers\Api\UserController::class,
    "quiz" => \App\Http\Controllers\Api\QuizController::class,
]);
