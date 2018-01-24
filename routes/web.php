<?php

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
    return view('welcome');
});

Route::get('/index', function () {
    return view('index');
});

Route::get('/philippe', function () {
    return view('philippe');
});

Route::get('/rahimuz', function(){
	return view('rahimuz');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
