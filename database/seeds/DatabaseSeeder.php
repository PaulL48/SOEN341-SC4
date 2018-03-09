<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * Executes with the command "php artisan db:seed"
     *
     * @return void
     */
    public function run()
    {
        // Add all the seeder classes in the order you want them called here
        $this->call([
            UserTableSeeder::class,
            QuestionTableSeeder::class]);
    }
}
