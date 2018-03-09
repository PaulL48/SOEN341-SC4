<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use DB;
use App\Quotation;
use App\Question;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class QuestionsController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    function insert(Request $req){

        
        $title = $req->input('title');
        $question = $req->input('question');
        $user_id = Auth::id();
        $resolved = $req->input('resolved');
        
        $data = array('title'=>$title, 'question'=> $question, 'user_id'=>$user_id, 'resolved'=> $resolved,'created_at' => Carbon::now()->format('Y-m-d H:i:s'));
        
        DB::table('questions')->insert($data);

        return response()->json([
            'result' => 'success'
        ]);
    }

    /**
     * Get the top questions according to votes
     * GET /questions/top
     * @return Redirect
     */
    public function top() {
        return view('questions.top', ['questions' => Question::top(), 'page_title' => 'Top Questions', 'sort' =>'top']);
    }

    public function retrieve() {
        // Retrieve question and author id
        $questions = DB::table('questions')->select('id','title', 'user_id as author', 'question', 'created_at', 'resolved')
                                           ->orderBy('created_at','desc')
                                           ->get();

        // Repopulate author id with author name
        foreach($questions as &$question)
        {
            $question->author = DB::table('users')->where('id', '=', $question->author)->value('name');
            if( !isset($question->author) )
            {
                $question->author = 'Non-Existent User';
            }
        }

        // The view returned here is to be replaced by the actual view
        return $questions;
    }

    public function retrieveQuestion(Request $req){
        $question = DB::table('questions')->where('id',$req->input('id'))->get();
        return response()->json([
            'question' => $question
        ]);
    }
    
    public function insertSuggestion(Request $req){

        // Get question
        $question = DB::table('questions')->where('id', $req->input('question_id'));
        $currentDBSuggestion = $question->value('suggestion');

        // Receive Question from Front-End
        $suggestion = $req->input('suggestion');

        // Update Suggestion in Database
        //if($currentDBSuggestion == null){
            $question->update(['suggestion' => $suggestion]);
        //}
    }

    public function retrieveSuggestion(Request $req){
        $suggestion = DB::table('questions')->where('id', $req->input('question_id'))->value('suggestion');

        return response()->json([
            'suggestion' => $suggestion
        ]);
    }

    //this method changes the question to the suggestion and sets that field to null
    public function acceptSuggestion(Request $req){
        $question = DB::table('questions')->where('id', $req->input('question_id'));
        $suggestion = DB::table('questions')->where('id', $req->input('question_id'))->value('suggestion');

        $question->update(['question' => $suggestion]); //set the question to the suggestion
        $question->update(['suggestion' => null]); //set the suggestion to null
    }
    
    //this method sets the suggestion to null without changing the question
    public function declineSuggestion(Request $req){
        $question = DB::table('questions')->where('id', $req->input('question_id'));
        $question->update(['suggestion' => null]); //set the suggestion to null
    }
}
