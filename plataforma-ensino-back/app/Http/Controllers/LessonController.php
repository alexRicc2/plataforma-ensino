<?php

namespace App\Http\Controllers;

use App\Http\Requests\LessonRequest;
use App\Http\Resources\LessonResource;
use App\Models\Alternative;
use App\Models\CourseModule;
use App\Models\Exercise;
use App\Models\Lesson;
use App\Models\LessonFiles;
use App\Models\LessonModule;
use Exception;
use FFMpeg\FFProbe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class LessonController extends Controller {

    protected $paginate = 10;

    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $lesson = Lesson::find($request->id);
            return response()->json([
                "status" => true,
                "severity" => "success",
                "lesson" => LessonResource::make($lesson)
            ]);
        }
        $lesson = Lesson::where("title", "ilike", $request->search . "%")->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "lessons" => LessonResource::collection($lesson),
            "pagination" => [
                "current_page" => $lesson->currentPage(),
                "last_page" => $lesson->lastPage()
            ]
        ]);
    }

    public function GetOne($lesson_id) {
        $lesson = Lesson::find($lesson_id);
        $lesson["files"] = $lesson->Files();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "lesson" => LessonResource::make($lesson)
        ]);
    }

    //POST

    public function Create(LessonRequest $request) {
        $data = $request->validated();
        
        $courseId = CourseModule::where("module_id", "=", $data["module_id"])->first();
        if ($courseId->exists) $courseId = $courseId->course_id;

        $lesson = new Lesson();
        $lesson->fill([
            "title" => $data["title"],
            "description" => $data["description"],
            "course_id" => $courseId
        ])->save();

        $questions = (array) json_decode($data["questions"]);
        foreach ($questions as $question) {
            $utterance = $question->utterance;
            $exercise = new Exercise();
            $exercise->fill([
                "title" => "",
                "utterance" => $utterance,
                "lesson_id" => $lesson->id
            ])->save();
                
            //alternatives creation
            $options = $question->options;
            foreach ($options as $option) {
                $alternative = new Alternative();
                $alternative->fill([
                    "text" => $option->text,
                    "exercise_id" => $exercise->id,
                    "correct" => $option->correct
                ])->save();
            }
        }

        $lessonModule = new LessonModule();
        $lessonModule->fill([
            "lesson_id" => $lesson->id,
            "module_id" => $data["module_id"]
        ])->save();

        if ($videos = $request->file("videos")) {
            $ffprobe = FFProbe::create([
                'ffmpeg.binaries'  => exec('C:/PATH_programs/ffmpeg.exe'),
                'ffprobe.binaries' => exec('C:/PATH_programs/ffprobe.exe')
            ]);
            foreach ($videos as $video) {
                $duration = $ffprobe->format($video)->get("duration");
                $size = $video->getSize();

                $originalFileName = pathinfo($video->getClientOriginalName(), PATHINFO_FILENAME);
                $filename = uniqid("lesson_video") . "." . $video->extension();
                $path = $video->storeAs("lessons_videos", $filename, ["disk" => "public"]);
                $lesson_file = new LessonFiles();
                $lesson_file->fill([
                    "lesson_id" => $lesson->id,
                    "name" => $originalFileName,
                    "path" => $path,
                    "type" => "video",
                    "duration" => $duration,
                    "size_in_bytes" => $size
                ])->save();
            }
        }

        if ($files = $request->file("files")) {
            foreach ($files as $file) {
                $size = $file->getSize();

                $originalFileName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                $filename = uniqid("lesson_file") . "." . $file->extension();
                $path = $file->storeAs("lessons_docs", $filename, ["disk" => "public"]);
                $lesson_file = new LessonFiles();
                $lesson_file->fill([
                    "lesson_id" => $lesson->id,
                    "name" => $originalFileName,
                    "path" => $path,
                    "type" => "document",
                    "size_in_bytes" => $size
                ]);

                if ($file->extension() == "pdf") {
                    //Formula to estimate the duration of a pdf reading:
                    //wordCount / 200 -> and transforming the value returned to the next integer
                    //250 / 200 = 1.25 -> 1.25 is then transformed to 2
                    $duration = ceil($lesson_file->PDFWordCount() / 200) * 60;
                    $lesson_file->fill([
                        "duration" => $duration
                    ]);
                }

                $lesson_file->save();
            }
        }

        return response()->json([
            "status" => true,
            "message" => "Aula criada com sucesso",
            "severity" => "success"
        ]);
    }

    public function Update(LessonRequest $request) {
        $data = $request->validated();

        
        $lesson = Lesson::where("id", "=", $data["id"])->first();
        $lesson->Exercises()->delete();
        
        $questions = (array) json_decode($data["questions"]);
        // $questionsIds = [];
        // Log::info($questions);
        foreach ($questions as $question) {
            $utterance = $question->utterance;
            if (preg_match("/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/", $question->questionId)) {
                $exercise = Exercise::withTrashed()->find($question->questionId);
                // if ($exercise->exists()) $exercise->delete();
                if ($exercise != null) {
                    $questionsIds[] = $question->questionId;
                    $exercise->fill([
                        "id" => $question->questionId,
                        "title" => "",
                        "utterance" => $utterance,
                        "lesson_id" => $lesson->id
                    ])->save();
                    $exercise->restore();
                } else {
                    $exercise = new Exercise();
                    $exercise->fill([
                        "title" => "",
                        "utterance" => $utterance,
                        "lesson_id" => $lesson->id
                    ])->save();
                }
            } else {
                $exercise = new Exercise();
                $exercise->fill([
                    "title" => "",
                    "utterance" => $utterance,
                    "lesson_id" => $lesson->id
                ])->save();
            }
                
            //alternatives creation
            $exercise->Alternatives()->delete();
            $options = $question->options;
            foreach ($options as $option) {
                if (preg_match("/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/", $option->id)) {
                    $alternative = Alternative::withTrashed()->find($option->id);
                    if ($alternative != null) {
                        $alternative->fill([
                            "id" => $option->id,
                            "text" => $option->text,
                            "exercise_id" => $exercise->id,
                            "correct" => $option->correct
                        ])->save();
                        $alternative->restore();
                        continue;
                    }
                }
                $alternative = new Alternative();
                $alternative->fill([
                    "text" => $option->text,
                    "exercise_id" => $exercise->id,
                    "correct" => $option->correct
                ])->save();
            }
        }

        // $lesson->Exercises()->whereNotIn("id", $questionsIds)->delete();

        if (isset($data["videos_to_delete"])) {//Procura os arquivos que devem ser deletados
            if (sizeof($data["videos_to_delete"]) == $lesson->Videos()->count() && !isset($data['videos'])) {
                return response()->json([
                    "status" => false,
                    "message" => "A aula deve conter pelo menos um vídeo",
                    "severity" => "error"
                ]);
            }

            for ($i = 0; $i < sizeof($data["videos_to_delete"]); $i++) {
                $lesson_to_delete = LessonFiles::where("id", "=", $data["videos_to_delete"][$i])->first();
                if (!$lesson_to_delete) return;
                $path = $lesson_to_delete["path"];
                $lesson_to_delete->delete();
            }
        } 
        
        if (isset($data["docs_to_delete"])) for ($i = 0; $i < sizeof($data["docs_to_delete"]); $i++) {
            $lesson_to_delete = LessonFiles::where("id", "=", $data["docs_to_delete"][$i])->first();
            if (!$lesson_to_delete) return;
            $path = $lesson_to_delete["path"];
            $lesson_to_delete->delete();
        }

        try {//Tenta criar os videos e arquivos
            if ($videos = $request->file("videos")) {
                $ffprobe = FFProbe::create();
                foreach ($videos as $video) {
                    $duration = $ffprobe->format($video)->get("duration");
                    $size = $video->getSize();

                    $originalFileName = pathinfo($video->getClientOriginalName(), PATHINFO_FILENAME);
                    $filename = uniqid("lesson_video") . "." . $video->extension();
                    $path = $video->storeAs("lessons_videos", $filename, ["disk" => "public"]);
                    $lesson_file = new LessonFiles();
                    $lesson_file->fill([
                        "lesson_id" => $lesson->id,
                        "name" => $originalFileName,
                        "path" => $path,
                        "type" => "video",
                        "duration" => $duration,
                        "size_in_bytes" => $size
                    ])->save();
                }
            }

            if ($files = $request->file("files")) {
                foreach ($files as $file) {
                    $size = $file->getSize();

                    $originalFileName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
                    $filename = uniqid("lesson_file") . "." . $file->extension();
                    $path = $file->storeAs("lessons_docs", $filename, ["disk" => "public"]);
                    $lesson_file = new LessonFiles();
                    $lesson_file->fill([
                        "lesson_id" => $lesson->id,
                        "name" => $originalFileName,
                        "path" => $path,
                        "type" => "document",
                        "size_in_bytes" => $size
                    ]);

                    if ($file->extension() == "pdf") {
                        //Formula to estimate the duration of a pdf reading:
                        //wordCount / 200 -> and transforming the value returned to the next integer
                        //250 / 200 = 1.25 -> 1.25 is then transformed to 2
                        $duration = ceil($lesson_file->PDFWordCount() / 200) * 60;
                        $lesson_file->fill([
                            "duration" => $duration
                        ]);
                    }
    
                    $lesson_file->save();
                }
            }

            $lesson->fill($data)->save();
            return response()->json([
                "status" => true,
                "message" => "Aula editada com sucesso",
                "severity" => "success"
            ]);
        } catch (Exception $e) {
            return response()->json([
                "status" => false,
                "message" => "Ocorreu um erro ao salvar os arquivos",
                "severity" => "error",
                "php_error_exception" => $e->getMessage()
            ]);
        }
    }
    
    public function Delete(LessonRequest $request) {
        $data = $request->validated();

        $lesson = Lesson::find($data["id"]);
        if ($lesson->exists()) $lesson->delete();    
        else return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "A aula não foi encontrada"
        ]);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Aula deletada com sucesso"
        ]);
    }

}
