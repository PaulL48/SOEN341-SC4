<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use DB;
use App\Quotation;
use Illuminate\Http\Request;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    function insert(Request $req){
        $title = $req->input('title');
        $question = $req->input('question');
        $user_id = $req->input('user_id');
        $resolved = $req->input('resolved');
        
        $data = array('title'=>$title, 'question'=> $question, 'user_id'=>$user_id, 'resolved'=> $resolved);
        
        DB::table('questions')->insert($data);
        
        DB::table('questions')->insert([
            'created_at' => Carbon::now()->format('Y-m-d H:i:s');
        ]);
        
        return redirect()->route('index');

    }
    
}
