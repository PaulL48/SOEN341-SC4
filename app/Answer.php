<?php
namespace App;
use App\Events\AnswerEvent;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
class Answer extends Model
{
/*     protected $events = [
      'created' => AnswerEvent::class
    ]; */
    public function user() {
        return $this->belongsTo('App\User');
    }
    public function question() {
        return $this->belongsTo('App\Question');
    }
    public function votes() {
        return $this->hasMany('App\Vote');
    }
    /**
     * Get answers and sort by vote sum()
     * @param $question_id
     * @return mixed
     */
    public static function get_sorted($question_id) {
        $answer = Answer::where('question_id', '=', $question_id)->get();
        return $answer->sortByDesc(function ($answer) {
            return $answer->votes->sum('vote');
        });
    }
    /**
     * Get answers and sort by vote sum()
     * @param $question_id
     * @return mixed
     */
    public static function get_answer_ids($question_id) {
        $answer_ids = Answer::select('user_id')->distinct()->where('question_id', $question_id)->get()->toArray();
        $answer_array = array();
        foreach($answer_ids as $var)
            $answer_array[] = $var['user_id'];
        return $answer_array;
    }
}