<?php

Auth::routes();

// Question operations
Route::post('/ask', 'QuestionsController@insert');
Route::get('/questions', 'QuestionsController@retrieve');
Route::get('/question', 'QuestionsController@retrieveQuestion');
Route::post('/insertSuggestion', array( 'before' => 'csrf', 'uses' => 'QuestionsController@insertSuggestion'));
Route::get('/retrieveSuggestion', 'QuestionsController@retrieveSuggestion');
Route::post('/acceptSuggestion', array( 'before' => 'csrf', 'uses' => 'QuestionsController@acceptSuggestion'));
Route::post('/declineSuggestion', array( 'before' => 'csrf', 'uses' => 'QuestionsController@declineSuggestion'));

// Answer operations
Route::post('/answer', 'AnswerController@insert');
Route::get('/answers', 'AnswerController@getAnswers');
Route::post('/vote/answer/accepted', 'AnswerController@setAcceptedAnswer');
Route::post('/vote/answer/removeAccepted', 'AnswerController@unsetAcceptedAnswer');

// Accepting Answer
Route::post('/acceptAnswer', array( 'before' => 'csrf', 'uses' => 'AcceptedAnswerController@acceptAnswer' ) );

// Question and answer voting operations
Route::post('/vote/answer', array( 'before' => 'csfr', 'uses' => 'VotesController@vote_answer' ) );
Route::post('/vote/question', array( 'before' => 'csfr', 'uses' => 'VotesController@vote_question' ) );
Route::get('/vote/question/count', array( 'before' => 'csfr', 'uses' => 'VotesController@getVoteCount' ) );
Route::get('/vote/answer/count', array( 'before' => 'csfr', 'uses' => 'VotesController@getAnswerVoteCount' ) );

// Check if the current user is Logged in
Route::get('/check', 'UserController@checkIfAuthenticated');
Route::get('/checkUser', 'UserController@checkUser');

Route::get( '/{any}', function () {
    return view('welcome');
})->where('any', '.*');
