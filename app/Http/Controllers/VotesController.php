<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use resources\assets\js\src\components\ListQuestions;

use DB;
use App\Vote;
use App\Avote;
use App\User;
use App\Question;
use Carbon\Carbon;

class VotesController extends Controller
{
    public function vote_question(Request $req)
    {
        $question = DB::table('questions')->where('id', $req->input('id'));
        $voteCount = $question->value('vote');
        $questionId = $question->value('id');
        $userId = $req->user()->id;

        $vote = Vote::where('user_id', $userId)->where('question_id', $questionId)->first();
        
        if($user = Auth::user()){
            if(!$vote){
                if($req->input('vote')=='upVote'){
                    $question->update(['vote' => $voteCount+1]);
                    $data = array('user_id' => $userId, 'question_id' => $questionId, 'upVote' => true, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'));
                }
                elseif($req->input('vote')=='downVote'){
                    $question->update(['vote' => $voteCount-1]);
                    $data = array('user_id' => $userId, 'question_id' => $questionId, 'downVote' => true, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'));
                }
                DB::table('votes')->insert($data);
            } else {
                $upVote = $vote->upVote;
                $downVote = $vote->downVote;
                if($upVote == true && $downVote == true){
                    $vote->update(['upVote' => false, 'downVote' => false]);
                    if($req->input('vote')=='upVote'){
                        $question->update(['vote' => $voteCount+1]);
                        $vote->update(['upVote' => true]);
                    } elseif($req->input('vote')=='downVote'){
                        $question->update(['vote' => $voteCount-1]);
                        $vote->update(['downVote' => true]);
                    }
                }
                if($upVote == false){
                    if($req->input('vote')=='upVote'){
                        $question->update(['vote' => $voteCount+1]);
                        $vote->update(['upVote' => true]);
                    }
                } 
                if($downVote == false){
                    if($req->input('vote')=='downVote'){
                        $question->update(['vote' => $voteCount-1]);
                        $vote->update(['downVote' => true]);
                    }
                }
            }
        }
        else
        {
            echo('Please Log In.');
        }
    }
    public function vote_answer(Request $req)
    {
        $answer = DB::table('answers')->where('id', $req->input('id'));
        $voteCount = $answer->value('votes');
        $answerId = $answer->value('id');
        $userId = $req->user()->id;

        $vote = Avote::where('user_id', $userId)->where('answer_id', $answerId)->first();

        if($user = Auth::user()){
            if(!$vote){
                if($req->input('vote')=='upVote'){
                    $answer->update(['votes' => $voteCount+1]);
                    $data = array('user_id' => $userId, 'answer_id' => $answerId, 'upVote' => true, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'));
                }
                elseif($req->input('vote')=='downVote'){
                    $answer->update(['votes' => $voteCount-1]);
                    $data = array('user_id' => $userId, 'answer_id' => $answerId, 'downVote' => true, 'created_at' => Carbon::now()->format('Y-m-d H:i:s'));
                }
                DB::table('avotes')->insert($data);
            } else {
                $upVote = $vote->upVote;
                $downVote = $vote->downVote;
                if($upVote == true && $downVote == true){
                    $vote->update(['upVote' => false, 'downVote' => false]);
                    if($req->input('vote')=='upVote'){
                        $answer->update(['votes' => $voteCount+1]);
                        $vote->update(['upVote' => true]);
                    } elseif($req->input('vote')=='downVote'){
                        $answer->update(['votes' => $voteCount-1]);
                        $vote->update(['downVote' => true]);
                    }
                }
                if($upVote == false){
                    if($req->input('vote')=='upVote'){
                        $answer->update(['votes' => $voteCount+1]);
                        $vote->update(['upVote' => true]);
                    }
                } 
                if($downVote == false){
                    if($req->input('vote')=='downVote'){
                        $answer->update(['votes' => $voteCount-1]);
                        $vote->update(['downVote' => true]);
                    }
                }
            }
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
