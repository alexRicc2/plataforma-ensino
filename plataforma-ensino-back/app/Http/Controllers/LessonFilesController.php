<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonFilesRequest;
use App\Http\Resources\LessonFilesResource;
use App\Http\Resources\LessonResource;
use App\Http\Resources\UserResource;
use App\Models\Lesson;
use App\Models\LessonFiles;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LessonFilesController extends Controller {
    
    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $file = LessonFiles::find($request->id);
            if (!$file) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Arquivo não achado"
            ]);

            if ($file->type == "document") return response()->json([
                "status" => true,
                "severity" => "success",
                "file" => LessonFilesResource::make($file),
                "lesson" => $file->Lesson()->first(),
                "userStatistics" => $file->Lesson()->first()->ExercisesStatistics(Auth::id()),
                "questions" => $file->Questions(),
                "answered" => $file->Lesson()->first()->AnsweredExercises(Auth::id())
            ]);

            #region Getting prev and next videos
            //Getting the lessons from the course to get files in order
            $lessons = $file->Course()->Lessons()->get();

            $files = [];

            foreach ($lessons as $lesson) {
                $videos = $lesson->Videos()->get();
                foreach ($videos as $video) {
                    $files[] = $video;
                }
            }

            $prev = "";
            $next = "";

            for ($i = 0; $i < count($files); $i++) {
                if ($files[$i]->id == $request->id) {
                    if ($i > 0) $prev = $files[$i - 1];

                    if ($i != count($files) - 1) $next = $files[$i + 1];
                }
            }
            #endregion

            return response()->json([
                "status" => true,
                "severity" => "success",
                "file" => LessonFilesResource::make($file),
                "questions" => $file->Questions(),
                "lesson" => $file->Lesson()->first(),
                "userStatistics" => $file->Lesson()->first()->ExercisesStatistics(Auth::id()),
                "answered" => $file->Lesson()->first()->AnsweredExercises(Auth::id()),
                "prev" => $prev,
                "next" => $next
            ]);
        } else if (isset($request->lesson)) {
            $lesson = Lesson::find($request->lesson);
            if (!$lesson) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Aula não achada"
            ]);

            $files = $lesson->Files();
            return response()->json([
                "status" => true,
                "severity" => "success",
                "files" => $files
            ]);
        }
    }

    //POST

    public function Alter(LessonFilesRequest $request) {
        $data = $request->validated();

        $file = LessonFiles::find($data["id"]);
        if ($file->exists()) $file->fill($data)->save();
        else return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "O arquivo não foi encontrado"
        ]);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Nome do arquivo alterado com sucesso"
        ]);
    }

    public function Delete(LessonFilesRequest $request) {
        $data = $request->validated();

        $file = LessonFiles::find($data["id"]);
        if ($file->exists()) $file->delete();    
        else return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "O arquivo não foi encontrado"
        ]);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Arquivo deletado com sucesso"
        ]);
    }

}
