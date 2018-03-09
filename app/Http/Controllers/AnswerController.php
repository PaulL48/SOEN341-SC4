<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Carbon\Carbon;
use DB;
use App\Answer;

class AnswerController extends Controller
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    function insert(Request $req){

        
        $question_id = $req->input('question_id');
        $answer = $req->input('answer');
        $user_id = Auth::id();
        $votes = 0;
        $accepted = 0;
        
        $answerer = DB::table('users')->where('id', Auth::id())->value('name');

        $data = array('question_id'=>$question_id, 'answer'=> $answer, 'user_id'=>$user_id, 'votes'=> $votes,'accepted'=>$accepted,'answerer'=>$answerer,'created_at' => Carbon::now()->format('Y-m-d H:i:s'),'updated_at'=>Carbon::now()->format('Y-m-d H:i:s'));
        
        DB::table('answers')->insert($data);

        return response()->json([
            'result' => 'success'
        ]);
    }

    public function getAnswers(Request $req){

        $hasAcceptedAnswer = false;
        $question_id = $req->input('question_id');

        $answers = DB::table('answers')->where('question_id', '=', $question_id)->orderBy('votes','desc')->get();

        
        foreach($answers as &$answer)
        {
            if($answer->accepted == 1)
            {
                $hasAcceptedAnswer = true;
            }
        }
        return response()->json([
            'data' => $answers,
            'hasAccepted' => $hasAcceptedAnswer
        ]);
    }

    public function setAcceptedAnswer(Request $req){
        $answer_id = $req->input('id');

        DB::table('answers')->where('id', $answer_id)->update(['accepted' => 1]);
    }

    public function unsetAcceptedAnswer(Request $req){
        $answer_id = $req->input('id');

        DB::table('answers')->where('id', $answer_id)->update(['accepted' => 0]);
    }
}
