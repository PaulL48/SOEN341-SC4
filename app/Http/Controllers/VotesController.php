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
        $questionID = $question->value('id');

        
        $vote = array('user_id' => Auth::id(), 
                      'question_id' => $questionID,
                      'voted' => true,
                      'created_at' => Carbon::now());
    
        
        $voteQId = DB::table('votes')->where('question_id', $questionID)->get();
        $voteDB = DB::table('votes')->where('user_id', Auth::id())->union($voteQId)->get();
        $voted = $voteDB->value('voted');
        
        if($user = Auth::user()){
            if($req->input('vote')=='upVote'){
                $question->update(['vote' => $voteCount+1]);
                $rowsAffected = DB::table('votes')->insert($vote);
                if($rowsAffected == 1)
                {
                    return response()->json(['data' => 'Vote created.'], 200);
                }
                else
                {
                    return response()->json(['data' => 'Failed to create vote.'], 400);
                }
            }
            elseif($req->input('vote')=='downVote'){
                $question->update(['vote' => $voteCount-1]);
                $rowsAffected = DB::table('votes')->insert($vote);
                if($rowsAffected == 1)
                {
                    return response()->json(['data' => 'Vote created.'], 200);
                }
                else
                {
                    return response()->json(['data' => 'Failed to create vote.'], 400);
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

    /**
     * Store a new vote submitted by a user
     */
    public function store(Request $req, $questionID)
    {
        $vote = array('user_id' => Auth::id(), 
                      'question_id' => $questionID, 
                      'answer_id' => 0, 
                      'voted' => true,
                      'created_at' => Carbon::now());
        $rowsAffected = DB::table('votes')->insert($vote);
        if($rowsAffected == 1)
        {
            return response()->json(['data' => 'Vote created.'], 200);
        }
        else
        {
            return response()->json(['data' => 'Failed to create vote.'], 400);
        }
    }

}
