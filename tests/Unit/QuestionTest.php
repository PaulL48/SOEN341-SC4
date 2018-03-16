<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class QuestionTest extends TestCase{   
    // Isolates manipulations to the database
    use RefreshDatabase;

    public function testQuestionAdd(){
        // This uses the seeded data
        $question = ['title' => 'Hello World?',
                     'question' => 'World Hello?',
                     'user_id' => '1',
                     'suggestion' => 'Maybe it should be Wello Horld'];

        $this->post('/ask', $question)
             ->seeJson(['result' => 'success']);
    }

    public function testGetTopVotedQuestion(){
        $this->assertTrue(false);
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
