<?php

namespace App\Models;

use App\Http\Resources\LessonFilesResource;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class Lesson extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";

    protected $fillable = [
        "course_id",
        "title",
        "description",
        "allow_answer_reveal",
        "min_percentage"
    ];

    public function Course() {
        return $this->belongsTo(CourseMain::class, "course_id", "id");
    }

    public function LessonFiles() {
        return $this->hasMany(LessonFiles::class, "lesson_id", "id");
    }

    public function Files() {
        $videos = $this->hasMany(LessonFiles::class, "lesson_id", "id")->where("type", "=", "video")->get();
        $docs = $this->hasMany(LessonFiles::class, "lesson_id", "id")->where("type", "=", "document")->get();
        $files = $this->hasMany(LessonFiles::class, "lesson_id", "id")->get();
        return json_decode(json_encode([
            "videos" => LessonFilesResource::collection($videos),
            "documents" => LessonFilesResource::collection($docs),
            "files" => LessonFilesResource::collection($files)
        ]));
    }

    public function Exercises() {
        return $this->hasMany(Exercise::class, "lesson_id", "id");
    }

    // public function AnsweredExercises($userId = Auth::id()) {
    //     return Answer::where("user_id", "=", $userId)->whereIn("exercise_id", $this->Exercises()->get()->pluck("id"))->count() > 0 ? true : false;
    // }

    public function AnsweredExercises($userId) {
        return Answer::where("user_id", "=", $userId)->whereIn("exercise_id", $this->Exercises()->get()->pluck("id"))->count() > 0 ? true : false;
    }

    public function ExercisesStatistics($userId) {
        $userRole = User::find(Auth::id())->Role()->first()->key;
        if (!$userId || ($userRole != "admin" && !$this->allow_answer_reveal)) return null;

        $exercisesIds = $this->Exercises()->pluck("id");
        $answers = Answer::whereIn("exercise_id", $exercisesIds)->where("user_id", "=", $userId)->get();

        $correctCount = 0;
        foreach ($answers as $answer) {
            if ($answer->IsCorrect()) $correctCount++;
        }

        return json_decode(json_encode([
            "totalCorrect" => $correctCount,
            "totalAnswered" => count($answers),
            "totalQuestions" => count($exercisesIds)
        ]));
    }

    //function that gets the user percentage of correct answers of the current lesson
    public function GetPercentage($userId) {
        $exercises = $this->Exercises()->get();

        $percentageSum = 0;

        foreach ($exercises as $exercise) {
            $isUserCorrect = $exercise->IsUserCorrect($userId);
            if ($isUserCorrect) $percentageSum++;
        }

        if (count($exercises) > 0) return $percentageSum / count($exercises) * 100;
        else return 0;
    }

    public function Questions($userId) {
        $response = [];
        $questions = Exercise::where("lesson_id", "=", $this->id)->get();
        
        $lockQuestions = Answer::where("user_id", "=", $userId)->whereIn("exercise_id", $questions->pluck("id"))->count() > 0 ? true : false;

        foreach ($questions as $question) {
            $options = [];
            $alternatives = $question->Alternatives()->get();

            $prevAnswer = Answer::where("user_id", "=", $userId)->where("exercise_id", "=", $question->id)->first();

            if ($prevAnswer != null) {
                $response[] = [
                    "questionId" => $question->id,
                    "utterance" => $question->utterance,
                    "options" => $alternatives,
                    "locked" => $lockQuestions,
                    "prevSelected" => $prevAnswer->Alternative(),
                    "correctAlternative" => $question->CorrectAlternative()->first()
                ];
            } else {
                $response[] = [
                    "questionId" => $question->id,
                    "utterance" => $question->utterance,
                    "options" => $alternatives,
                    "locked" => $lockQuestions,
                    "tempAnswer" => $question->TempAnswer()->first()
                ];
            }
        }

        return json_decode(json_encode($response));
    }

    public function Videos() {
        $result = $this->hasMany(LessonFiles::class, "lesson_id", "id")->where("type", "=", "video");
        return $result;
    }

    public function Docs() {
        $result = $this->hasMany(LessonFiles::class, "lesson_id", "id")->where("type", "=", "document");
        return $result;
    }

}
