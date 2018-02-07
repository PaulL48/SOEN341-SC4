<?php

namespace App\Http\Controllers;

use Auth;
use Illuminate\Http\Request;

class Logout extends Controller
{
    
    public function CheckLogin(){
        if (Auth::check()) {    
            return response()->json([
                'message'=> 'is logged in'
            ]);
        }else{
            return response()->json([
                'message'=> 'is logged out'
            ]);
        }
    }
}
