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

    function suggestChange(Request $req){
        $question_id = $req->input('question_id');
        $suggestion = $req->input('suggestion');
        $question = DB::table('questions')->where('id', $question_id);

        $question->update(['suggestion' => $suggestion]);
    }
    /**
     * Get the top questions according to votes
     * GET /questions/top
     * @return Redirect
     */
    public function top() {
        return view('questions.top', ['questions' => Question::top(), 'page_title' => 'Top Questions', 'sort' =>'top']);
    }
    
}
