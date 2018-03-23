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
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;

class QuestionsController extends BaseController{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    /**
     * Return a 400 code failure response
     * 
     * @return Response
     */
    private function makeFailureResponse()
    {
        return response()->json([
            'result' => 'failure',
            'code'   => 400
        ]);
    }

    /**
     * Create a question
     * 
     * Verb: POST
     * URL: /ask
     * 
     * @return Response
     */
    function insert(Request $request){
        // Add currently authenticated user to request for validation
        $request->request->add(['user_id' => Auth::id()]);
        $validator = Validator::make($request->all(), [
            'title'    => 'required',
            'question' => 'required',
            'user_id'  => 'required'
        ]);

        // Perform validation and check for failure 
        if($validator->fails()){
            return $this->makeFailureResponse();
        }

        // Extract data from request
        $question = [ 'title'    => $request->input('title'),
                      'question' => $request->input('question'),
                      'user_id'  => $request->input('user_id')];

        // Push data to database
        $questionId = DB::table('questions')->insertGetId($question);

        // Return success and created resource ID
        return response()->json([
            'result'      => 'success',
            'code'        => 200,
            'resource_id' => $questionId
        ]);
    }

    /**
     * Get the top questions according to votes
     * GET /questions/top
     * 
     * Consider for removal
     * 
     * @return Redirect
     */
    public function top(){
        return view('questions.top', ['questions' => Question::top(), 'page_title' => 'Top Questions', 'sort' =>'top']);
    }

    /**
     * Get a collection containing all questions 
     * 
     * Verb: GET
     * URL: /questions
     * 
     * @return Response
     */
    public function retrieve(){
        // Retrieve question and author id
        $questions = DB::table('questions')->select('id','title', 'user_id as author', 'question', 'created_at', 'resolved')
                                           ->orderBy('created_at','desc')
                                           ->get();

        // Repopulate author id with author name
        foreach($questions as &$question){
            $question->author = DB::table('users')->where('id', '=', $question->author)->value('name');
            if( !isset($question->author) ){
                $question->author = 'Non-Existent User';
            }
        }

        return $questions;
    }

    /**
     * Get a single question by ID
     * 
     * Verb: GET
     * URL: /question
     * 
     * @return Response
     */
    public function retrieveQuestion(Request $request){
        $validator = Validator::make($request->all(), ['id' => 'required']);

        // Perform validation and check for failure 
        if($validator->fails()){
            return $this->makeFailureResponse();
        }

        // Query database and return the result
        $question = DB::table('questions')->where('id', $request->input('id'))->get();
        return response()->json([
            'question' => $question,
            'code' => 200
        ]);
    }
    
    /**
     * Create a suggestion for a question
     * 
     * Verb: POST
     * URL: /insertSuggestion
     * 
     * @return Response
     */
    public function insertSuggestion(Request $request){
        $validator = Validator::make($request->all(), [
            'question_id'  => 'required',
            'suggestion'   => 'required',
            'suggested_by' => 'required'
        ]);
        
        // Perform validation and check for failure 
        if($validator->fails()){
            return $this->makeFailureResponse();
        }

        // Get question
        $question = DB::table('questions')->where('id', $request->input('question_id'));
        $currentDBSuggestion = $question->value('suggestion');
        
        // Receive Question from Front-End
        $suggestion = $request->input('suggestion');
        $suggested_by = $request->input('suggested_by');

        // Update Suggestion in Database
        $question->update(['suggestion' => $suggestion]);
        $question->update(['suggested_by' => $suggested_by]);

        return response()->json([
            'code' => 200,
        ]);
    }

    /**
     * Gets a suggestion for a question by id
     * 
     * Verb: GET
     * URL: /retrieveSuggestion
     * 
     * @return Response
     */
    public function retrieveSuggestion(Request $request){
        $validator = Validator::make($request->all(), ['question_id' => 'required']);

        // Perform validation and check for failure 
        if($validator->fails()){
            return $this->makeFailureResponse();
        }

        $suggestion = DB::table('questions')->where('id', $request->input('question_id'))->value('suggestion');
        $suggested_by = DB::table('questions')->where('id', $request->input('question_id'))->value('suggested_by');
        return response()->json([
            'suggestion' => $suggestion,
            'suggested_by' => $suggested_by
        ]);
    }

    /**
     * Change the question to the suggestion and set that field to null
     * 
     * Verb: POST
     * URL: /acceptSuggestion
     * 
     * @return Response
     */
    public function acceptSuggestion(Request $request){
        $validator = Validator::make($request->all(), ['question_id' => 'required']);

        // Perform validation and check for failure 
        if($validator->fails()){
            return $this->makeFailureResponse();
        }

        $question = DB::table('questions')->where('id', $request->input('question_id'));
        $suggestion = DB::table('questions')->where('id', $request->input('question_id'))->value('suggestion');
        $suggested_by = $request->input('suggested_by');

        $question->update(['question' => $suggestion]); //set the question to the suggestion
        $question->update(['suggestion' => null]); //set the suggestion to null
        $question->update(['suggested_by' => '']);

        return response()->json(['code' => 200]);
    }
    
    /**
     * Sets the suggestion to null without changing the question
     * 
     * Verb: POST
     * URL: /declineSuggestion
     * 
     * @return Response
     */
    public function declineSuggestion(Request $request){
        $validator = Validator::make($request->all(), ['question_id' => 'required']);

        // Perform validation and check for failure 
        if($validator->fails()){
            return $this->makeFailureResponse();
        }
        
        $question = DB::table('questions')->where('id', $request->input('question_id'));
        $question->update(['suggestion' => null]); //set the suggestion to null

        $suggested_by = $request->input('suggested_by');
        $question->update(['suggested_by' => '']);
    }
}
