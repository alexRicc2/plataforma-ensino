<?php

namespace App\Models;

use Exception;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Smalot\PdfParser\Parser;

class LessonFiles extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";
    protected $table = "lesson_files";

    protected $fillable = [
        "lesson_id",
        "path",
        "type",
        "name",
        "duration",
        "size_in_bytes"
    ];

    public function Lesson() {
        return $this->belongsTo(Lesson::class, "lesson_id", "id");
    }

    public function Course() {
        $lesson = $this->Lesson()->first();
        return CourseMain::find($lesson->course_id); 
    }

    public function UserFiles() {
        return $this->hasMany(UserFile::class, "file_id", "id");
    }

    //Is called in the front when switching the files
    public function Questions() {
        $lesson = $this->Lesson()->first();
        $response = [];
        $questions = Exercise::where("lesson_id", "=", $lesson->id)->get();
        
        $lockQuestions = Answer::where("user_id", "=", Auth::id())->whereIn("exercise_id", $questions->pluck("id"))->count() > 0 ? true : false;

        foreach ($questions as $question) {
            $options = [];
            $alternatives = $question->BlindAlternatives();

            $prevAnswer = Answer::where("user_id", "=", Auth::id())->where("exercise_id", "=", $question->id)->first();

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

    public function PDFWordCount() {
        $path = Storage::disk("public")->path($this->path);
        $parser = new Parser();
        try {
            $pdf = $parser->parseFile($path);
        } catch (Exception $e) {
            return 0;
        }
        $text = $pdf->getText();
        $text = trim($text);
        $text = str_replace("  ", " ", $text);

        return str_word_count($text);
    }

}
