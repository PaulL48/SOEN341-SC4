<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $jonID = DB::table('users')->where('name', '=', 'Jon Doe')->value('id');
        $fooID = DB::table('users')->where('name', '=', 'Jon Doe')->value('id');
        $questionJon = ['title' => 'What are we?',
                        'question' => 'Are we dust in the wind?',
                        'user_id' => $jonID];

        $questionFoo = ['title' => 'What is the small town girl\'s origin?',
                        'question' => 'Was she born and raised in south detroit?',
                        'user_id' => $fooID];

        DB::table('questions')->insert($questionJon);
        DB::table('questions')->insert($questionFoo);
    }
}
