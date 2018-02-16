<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use App\Vote;
class VotesController extends Controller
{
    public function vote_question(Request $req)
    {
        //return Response::json(Vote::vote(Auth::id(), Request::get('question_id'), Request::get('vote'), 'question_id'));

        $question = DB::table('questions')->where('id', $req->input('id'));
        $voteCount = $question->value('vote');

        if(Request::get('vote')=='upVote'){
            $question->update(['vote' => $voteCount+1]);
        }
        elseif(Request::get('vote')=='downVote'){
            $question->update(['vote' => $voteCount-1]);
        }
    }
    public function vote_answer()
    {
        //return Response::json(Vote::vote(Auth::id(), Request::get('answer_id'), Request::get('vote'), 'answer_id'));
    }

}