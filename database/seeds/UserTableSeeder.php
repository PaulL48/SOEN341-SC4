<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userJon = ['name'     => 'Jon Doe',
                    'email'    => 'jon@doe.com',
                    'password' => bcrypt('password')];

        $userFoo = ['name'     => 'Foo Bar',
                    'email'    => 'foo@bar.com',
                    'password' => bcrypt('password')];

        DB::table('users')->insert($userJon);
        DB::table('users')->insert($userFoo);
    }
}
