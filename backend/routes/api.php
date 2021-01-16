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



Route::group([

    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {

    Route::post('login', 'AuthController@login')->name('login');
    Route::post('register', 'AuthController@register')->name('register');
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');

});


Route::group([

    'middleware' => 'jwt.verify',

], function ($router) {

    Route::get('activities', 'ActivityController@index');

    Route::get('activities/{id}', 'ActivityController@retrieve');

    Route::post('activities', 'ActivityController@store');

    Route::put('activities/{id}', 'ActivityController@update');

    Route::patch('activities/{id}/status', 'ActivityController@setStatus');

    Route::delete('activities/{id}', 'ActivityController@delete');

});
