<?php

namespace Tests\Unit;

use DB;
use Tests\TestCase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Input;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\Concerns\ImpersonatesUsers;

// User defined models
use App\User;
use App\Question;

class QuestionControllerTest extends TestCase{   
    
    //use RefreshDatabase;   // Isolate manipulations to the database
    use WithoutMiddleware; // Disables need for a valid csrf token

    private function actAsMockUser(){
        $user = factory(User::class)->create();
        $this->actingAs($user);
        return $user;
    }

    // Create a dummy question and return it's id
    private function createDummyQuestion(){
        $question = ['title' => 'Hello World?',
                     'question' => 'World Hello?'];
        $response = $this->post('/ask', $question);

        return $response->getData()->resource_id;
    }

    public function testQuestionAdd(){
        $question = ['title' => 'Hello World?',
                     'question' => 'World Hello?'];

        $this->actAsMockUser();

        // Assure request returns success
        $response = $this->post('/ask', $question)
                         ->assertJson(['code' => 200]);

        // Assure this question exists
        $actualResult = DB::table('questions')->where('id', $response->getData()->resource_id)->first();
        $this->assertEquals($actualResult->title, $question['title']);
        $this->assertEquals($actualResult->question, $question['question']);
    }

    public function testQuestionAddMalformed(){
        $question = ['question' => 'Test'];
        $this->post('/ask', $question)
             ->assertJson(['code' => 400]);
    }

    public function testGetAllQuestions(){
        $this->actAsMockUser();

        // Fill the databse with some data even if it's empty
        for($i = 0; $i < 1; $i++){
            $this->createDummyQuestion();
        }

        // Assure there is at least one nested object which contains the keys
        $this->get('/questions')
             ->assertJsonStructure([
                '*' => [
                    'id',
                    'title', 
                    'author', 
                    'question', 
                    'created_at', 
                    'resolved'
                ]
             ]);
    }

    public function testGetQuestion(){
        $this->actAsMockUser();

        // Add a single unique question
        $questionId = $this->createDummyQuestion();

        // Assure there is a nested 'question' object which contains the keys
        $this->get("/question?id={$questionId}")
             ->assertJsonStructure([
                'question' => [
                    '*' => [
                        'id',
                        'title', 
                        'user_id', 
                        'question', 
                        'created_at', 
                        'resolved'
                    ]
                ]
             ]);
    }

    public function testAddSuggestion(){
        $this->actAsMockUser();

        $questionId = $this->createDummyQuestion();
        $suggestionData = ['csrf' => 999, // Since middleware is deactivated, this can be anything
                           'question_id' => $questionId, 
                           'suggestion' => "How about no.",
                           'suggested_by' => 123,
                          ];

        $this->post('/insertSuggestion', $suggestionData)
             ->assertJson(['code' => 200]);

        $actualResult = DB::table('questions')->where('id', $questionId)->first();
        $this->assertEquals($actualResult->suggestion, $suggestionData['suggestion']);
        $this->assertEquals($actualResult->suggested_by, $suggestionData['suggested_by']);
    }

    public function testGetSuggestion(){
        $this->actAsMockUser();

        $questionId = $this->createDummyQuestion();
        $suggestionData = ['csrf' => 999, // Since middleware is deactivated, this can be anything
                           'question_id' => $questionId, 
                           'suggestion' => "How about no.",
                           'suggested_by' => 123,
                          ];

        $this->post('/insertSuggestion', $suggestionData);
        $this->get("/retrieveSuggestion?question_id={$questionId}")
             ->assertJson(['suggestion' => $suggestionData['suggestion'],
                           'suggested_by' => $suggestionData['suggested_by']]);
    }

    public function testAcceptSuggestion(){
        $this->actAsMockUser();

        $questionId = $this->createDummyQuestion();
        $suggestionData = ['csrf' => 999, // Since middleware is deactivated, this can be anything
                           'question_id' => $questionId, 
                           'suggestion' => "How about no.",
                           'suggested_by' => 123,
                          ];

        $this->post('/insertSuggestion', $suggestionData);
        $this->post('/acceptSuggestion', ['question_id' => $questionId])
             ->assertJson(['code' => 200]);

        $actualResult = DB::table('questions')->where('id', $questionId)->first();
        $this->assertEquals($actualResult->question, $suggestionData['suggestion']);
        $this->assertNull($actualResult->suggestion);
    }

    public function testDeclineSuggestion(){
        $this->actAsMockUser();

        $questionId = $this->createDummyQuestion();
        $suggestionData = ['csrf' => 999, // Since middleware is deactivated, this can be anything
                           'question_id' => $questionId, 
                           'suggestion' => "How about no. 111111111111",
                           'suggested_by' => 123,
                          ];

        $this->post('/insertSuggestion', $suggestionData);
        $this->post('/declineSuggestion', ['question_id' => $questionId]);

        $actualResult = DB::table('questions')->where('id', $questionId)->first();
        $this->assertNotEquals($actualResult->question, $suggestionData['suggestion']);
        $this->assertNull($actualResult->suggestion);
    }
}
