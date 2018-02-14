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

Route::get('/questions', 'QuestionsRetrievalController@index');

Auth::routes();

Route::get('/question/ask', function(){
    return view('AskQuestion');
})->middleware('auth');


//Accepting Answer
Route::post('/acceptAnswer', array( 'before'=>'csrf','uses'=>'AcceptedAnswerController@acceptAnswer' ) );

Route::get( '/{any}', function () {
    return view('welcome');
})->where('any', '.*');
