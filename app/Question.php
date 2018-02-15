<?php
namespace App;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Carbon;
class Question extends Model {
    // Pagination Counts
    private static $pagination_count = 10;
    private static $pagination_count_min = 5;
    // Create the relationship to users
    public function user() {
        return $this->belongsTo('App\User');
    }
    // Create the relationship to answers
    public function answers() {
        return $this->hasMany('App\Answer');
    }
    // Create the relationship to votes
    public function votes() {
        return $this->hasMany('App\Vote');
    }

    /**
     * Returns pagination count based on if int is > 0
     * @param $int
     * @return int
     */
    private static function get_pagination($int) {
        if ($int > 0) return self::$pagination_count_min;
        else return self::$pagination_count;
    }
    /**
     * Returns relevant questions sorted by vote count
     * @return mixed
     */
    public static function top() {
        return Question::join('votes', 'questions.id', '=', 'votes.question_id')
            ->select('questions.*', DB::raw('sum(votes.vote) as vote_ttl'))
            ->groupBy('questions.id')
            ->orderBy('vote_ttl', 'desc')
            ->orderBy('questions.created_at', 'desc')
            ->paginate(self::$pagination_count);
    }

}