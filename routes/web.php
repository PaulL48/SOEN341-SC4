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

Route::get('/paul', function() {
	return view('paul');
});

Route::get('/rahimuz', function(){
	return view('rahimuz');
});

Route::get('/nirmal', function () {
    return view('nirmal');
});
  
Route::get('/xing',function(){
	return view('xing');
});

Route::get('/khang', function() {
	return view('khang');
});

Auth::routes();


Route::get('/home', 'HomeController@index')->name('home');

Route::get( '/{any}', function () {
    return view('welcome');
})->where('any', '.*');

//votes
Route::post('vote/answer', array( 'before'=>'csfr','uses'=>'VotesController@vote_answer' ) );
Route::post('vote/question', array( 'before'=>'csfr','uses'=>'VotesController@vote_question' ) );