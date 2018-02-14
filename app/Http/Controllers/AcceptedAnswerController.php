<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use DB;
use App\Quotation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AcceptedAnswerController extends BaseController {
    
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    function acceptAnswer(Request $req){

        $answerId = $req->input('id'); //retrieve answer ID
        $answer = DB::table('answers')->where('id', $answerId); //retrieve answer
        
        $questionId = $answer->value('question_id'); //retrieve the question ID
        $question = DB::table('questions')->where('id', $questionId);   //retrieve question
        $id = Auth::id();
        if($id == $question->value('user_id')){
            if(!$question->value('resolved')){
                $answer->update(['accepted' => true]);
                DB::table('questions')->where('id', $questionId)->update(['resolved' => true]);
            }
        }
    }   
}