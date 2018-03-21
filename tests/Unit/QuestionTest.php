<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\User;
use App\Question;
use Illuminate\Foundation\Testing\Concerns\ImpersonatesUsers;
use Illuminate\Support\Facades\Auth;
use DB;

class QuestionTest extends TestCase{   
    // Isolate manipulations to the database
    use RefreshDatabase;

    public function testQuestionAdd(){
        // Create a mock user
        $user = factory(User::class)->create();

        $question = ['title' => 'Hello World?',
                     'question' => 'World Hello?'];

        // Authenticate as the mock user
        $this->actingAs($user);

        $this->post('/ask', $question)
             ->assertJson(['result' => 'success']);
    }

    public function testQuestionAddMalformed(){
        $question = ['question' => 'Test'];
        $this->post('/ask', $question)
             ->assertJson(['result' => 'failed']);
    }

    public function testGetAllQuestions(){
        
        $this->assertTrue(false);
    }

    public function testGetQuestionBody(){
        $this->assertTrue(false);
    }

    public function testAddSuggestion(){
        $this->assertTrue(false);
    }

    public function testGetSuggestion(){
        $this->assertTrue(false);
    }

    public function testAcceptSuggestion(){
        $this->assertTrue(false);
    }

    public function testDeclineSuggestion(){
        $this->assertTrue(false);
    }
}
