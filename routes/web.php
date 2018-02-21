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
Auth::routes();

//voting on a question or answer
Route::post('/vote/answer', array( 'before'=>'csfr','uses'=>'VotesController@vote_answer' ) );
Route::post('/vote/question', array( 'before'=>'csfr','uses'=>'VotesController@vote_question' ) );
Route::get('/vote/question/count', array( 'before'=>'csfr','uses'=>'VotesController@getVoteCount' ) );

//Get available questions
Route::get('/questions', 'QuestionsRetrievalController@index');

//Accepting Answer
Route::post('/acceptAnswer', array( 'before'=>'csrf','uses'=>'AcceptedAnswerController@acceptAnswer' ) );

//Check if the current user is Logged in
Route::get('/check','UserController@checkIfAuthenticated');
Route::get('/checkUser','UserController@checkUser');

//Add question 
Route::post('/ask', 'QuestionsController@insert');

Route::get( '/{any}', function () {
    return view('welcome');
})->where('any', '.*');
Route::post('/vote/question', array( 'before'=>'csfr','uses'=>'VotesController@vote_question' ) );
Route::get('/vote/question/count', array( 'before'=>'csfr','uses'=>'VotesController@getVoteCount' ) );

//Accepting Answer
Route::post('/acceptAnswer', array( 'before'=>'csrf','uses'=>'AcceptedAnswerController@acceptAnswer' ) );

//Add question 
Route::post('/ask', 'QuestionsController@insert');

Route::get( '/{any}', function () {
    return view('welcome');
})->where('any', '.*');
