<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UserTest extends TestCase
{
    public function testUserExist()
    {
        // Create Test User
        $user = factory(\App\User::class)->create([
            'name' => 'Test Boi',
            'email' => 'boi@test.com',  
            'password' => bcrypt('password')
        ]);
        $this->assertDatabaseHas('users',$user);
        return;
    }

    public function noDuplicate()
    {
        // Create Test User
        $user = factory(\App\User::class)->create([
            'name' => 'Test Boi',
            'email' => 'boi@test.com',  
            'password' => bcrypt('password')
        ]);
        
        // New User to Test Against
        $newUser = [
            'name' => 'Boi Test',
            'email' => 'boi@test.com',  
            'password' => bcrypt('password')
        ];

        // Test to see if duplicated (deemed duplicated if email is duplicated)
        try 
        {
            factory(\App\User::class)->create($newUser);
        } 
        catch(Exception $e) 
        {
            $this->assertTrue(true);
            return;
        }

        // Test Failed
        $this->fail("Duplicate Not Caught");
    }
}
