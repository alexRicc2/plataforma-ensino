<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExerciseRequest;
use App\Http\Resources\ExerciseResource;
use App\Models\Alternative;
use App\Models\Answer;
use App\Models\Exercise;
use App\Models\TempAnswer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use stdClass;

class ExerciseController extends Controller {

    //GET

    public function Get(Request $request) {
        return false;
    }

    //POST

    public function Log(ExerciseRequest $request) {
        $data = $request->validated();
        $answers = (array) json_decode($data["answers"]);
        foreach ($answers as $answer) {
            if ($answer == null || !isset($answer->answer) || $answer->answer == null) continue;
            $exerciseId = $answer->questionId;
            $exercise = Exercise::find($exerciseId);

            TempAnswer::where("user_id", "=", Auth::id())->where("exercise_id", "=", $answer->questionId)->delete();//forceDelete
            $tempAnswer = new TempAnswer();
            $tempAnswer->fill([
                "exercise_id" => $answer->questionId,
                "alternative_id" => $answer->answer,
                "user_id" => Auth::id()
            ])->save();
        }

        //is it necessary to return something?
        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Respostas sincronizadas"
        ]);
    }

    public function Submit(ExerciseRequest $request) {
        $data = $request->validated();
        $answers = (array) json_decode($data["answers"]);
        $totalQuestions = sizeof($answers);
        $totalCorrect = 0;

        $correctAnswers = [];

        $questions = [];

        $lesson = new stdClass();

        foreach ($answers as $answer) {
            $questionId = $answer->questionId;
            $exercise = Exercise::find($questionId);
            $lesson = $exercise->Lesson()->first();
            $correctAnswers[] = $exercise->CorrectAlternative()->first();

            $answer = $answer->answer;
            Log::info($answer);
            $alternative = Alternative::find($answer);

            $questions[] = json_decode(json_encode([
                "questionId" => $questionId,
                "locked" => true,
                "options" => $exercise->BlindAlternatives(),
                "utterance" => $exercise->utterance,
                // "prevSelected" => $answer,
                "correctAlternative" => $exercise->CorrectAlternative()->first()
            ]));
    
            if ($alternative == null || !$alternative->exists()) continue;
            
            Answer::where("exercise_id", "=", $questionId)->where("user_id", "=", Auth::id())->delete();
            $answerModel = new Answer();
            $answerModel->fill([
                "exercise_id" => $questionId,
                "alternative_id" => $alternative->id,
                "user_id" => Auth::id()
            ])->save();

            if ($alternative->correct) $totalCorrect++;
        }
        
        if (!$lesson->allow_answer_reveal) {
            $totalCorrect = null;
            $totalQuestions = null;
        }

        return response()->json([
            "status" => true,
            "totalQuestions" => $totalQuestions,
            "totalCorrect" => $totalCorrect,
            "questions" => $questions
        ]);
    }
}
