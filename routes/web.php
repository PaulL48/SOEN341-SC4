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
Route::get('/vote/answer/count', array( 'before'=>'csfr','uses'=>'VotesController@getAnswerVoteCount' ) );

//Get available questions
Route::get('/questions', 'QuestionsRetrievalController@index');

//Accepting Answer
Route::post('/acceptAnswer', array( 'before'=>'csrf','uses'=>'AcceptedAnswerController@acceptAnswer' ) );

//Suggest a change to the Question
Route::post('/suggest', array( 'before'=>'csrf','uses'=>'QuestionsController@suggestChange'));

//Get an existing suggestion
//Route::get('/getSuggestion')

//Check if the current user is Logged in
Route::get('/check','UserController@checkIfAuthenticated');
Route::get('/checkUser','UserController@checkUser');

//Add question 
Route::post('/ask', 'QuestionsController@insert');

//Add Answer for a question 
Route::post('/answer','AnswerController@insert');

//Get Available answers
Route::get('/answers','AnswerController@getAnswers');

//Set/unset AcceptedAnswer

Route::post('/vote/answer/accepted', 'AnswerController@setAcceptedAnswer');
Route::post('/vote/answer/removeAccepted','AnswerController@unsetAcceptedAnswer');

Route::get( '/{any}', function () {
    return view('welcome');
})->where('any', '.*');
