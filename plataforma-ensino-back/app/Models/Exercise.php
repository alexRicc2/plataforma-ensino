<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Exercise extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "exercise";
    protected $keyType = "string";

    protected $fillable = [
        "id",
        "title",
        "utterance",
        "lesson_id"
    ];

    public function Lesson() {
        return $this->belongsTo(Lesson::class, "lesson_id", "id");
    }

    public function Alternatives() {
        return $this->hasMany(Alternative::class, "exercise_id", "id");
    }

    public function CorrectAlternative() {
        $lesson = $this->Lesson()->first();
        if ($lesson->allow_answer_reveal) return $this->Alternatives()->where("correct", "=", true);
        return $this->Alternatives()->whereNull("id");
    }

    public function BlindAlternatives() {
        $response = [];
        $alternatives = $this->Alternatives()->get();

        foreach ($alternatives as $alternative) {
            unset($alternative["correct"]);
        }

        return $alternatives;
    }

    public function TempAnswer() {
        return $this->hasMany(TempAnswer::class, "exercise_id", "id")->where("user_id", "=", Auth::id());
    }

    public function Answers() {
        return $this->hasMany(Answer::class, "exercise_id", "id");
    }

    public function IsUserCorrect($userId) {
        $userAnswer = $this->Answers()->where("user_id", "=", $userId)->first();
        if ($userAnswer == null) return null;

        return $userAnswer->IsCorrect();
    }

}
