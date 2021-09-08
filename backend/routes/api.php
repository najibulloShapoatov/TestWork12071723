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

Route::post('register', [\App\Http\Controllers\AuthController::class, 'register']);
Route::post('login', [\App\Http\Controllers\AuthController::class, 'login']);

Route::get('post', [\App\Http\Controllers\PostController::class, 'index']);
Route::post('post', [\App\Http\Controllers\PostController::class, 'store']);
Route::get('post/{id}', [\App\Http\Controllers\PostController::class, 'show']);

Route::post('post/update/{id}', [\App\Http\Controllers\PostController::class, 'update']);
Route::delete('post/{id}', [\App\Http\Controllers\PostController::class, 'destroy']);


Route::middleware('auth:sanctum')->group(function () {
    Route::get('user', [\App\Http\Controllers\AuthController::class, 'user']);
    Route::post('logout', [\App\Http\Controllers\AuthController::class, 'logout']);
});
