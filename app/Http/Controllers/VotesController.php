<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use resources\assets\js\src\components\ListQuestions;

use DB;
class VotesController extends Controller
{
    public function vote_question(Request $req)
    {
        $question = DB::table('questions')->where('id', $req->input('id'));
        $voteCount = $question->value('vote');

        
        if($user = Auth::user()){
            if($req->input('vote')=='upVote'){
                $question->update(['vote' => $voteCount+1]);
            }
            elseif($req->input('vote')=='downVote'){
                $question->update(['vote' => $voteCount-1]);
            }
        }
        else
        {
            echo('Please Log In.');
        }
    }
    public function vote_answer(Request $req)
    {
        $question = DB::table('answers')->where('id', $req->input('id'));
        $voteCount = $question->value('votes');

        if($req->input('vote')=='upVote'){
            $question->update(['votes' => $voteCount+1]);
        }
        elseif($req->input('vote')=='downVote'){
            $question->update(['votes' => $voteCount-1]);
        }
    }

    public function getVoteCount(Request $req)
    {
        $question = DB::table('questions')->where('id', $req->input('id'));

        $vote = $question->value('vote');

        return response()->json([
            'count' =>  $vote
        ]);
    }


    public function getAnswerVoteCount(Request $req)
    {
        $question = DB::table('answers')->where('id', $req->input('id'));

        $vote = $question->value('votes');

        return response()->json([
            'count' =>  $vote
        ]);
    }

}
