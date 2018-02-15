<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuestionsRetrievalController extends Controller
{
    public function index()
    {
        // Retrieve question and author id
        $questions = DB::table('questions')->select('title', 'user_id as author', 'question', 'created_at', 'resolved')
                                           ->orderBy('created_at')
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
}

?>