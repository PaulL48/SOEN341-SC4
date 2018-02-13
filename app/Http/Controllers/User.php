<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class User extends Controller
{
    function CheckUserInfo(Request $request){
        return response()->json([
            'name' => 'Abigail',
            'state' => 'CA'
        ]);
    }
}
