<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseMainRequest;
use App\Http\Resources\CourseMainNotInResource;
use App\Http\Resources\CourseMainResource;
use App\Models\CourseMain;
use App\Models\CoursesCategory;
use App\Models\CoursesCategoryRelation;
use App\Models\CoursesResponsibles;
use App\Models\CourseTags;
use App\Models\Lesson;
use App\Models\UserCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CourseMainController extends Controller {
    
    protected $paginate = 20;

    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $course = CourseMain::find($request->id);
            if (!$course->exists()) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "O curso não foi achado"
            ]);

            //creates a relation with the course and user if it's free
            if ($course->free) UserCourse::firstOrNew(
                ["user_id" => Auth::id(), "course_id" => $course->id], 
                ["user_id" => Auth::id(), "course_id" => $course->id]
            )->save();

            //controle de aluno com acesso

            // if (UserCourse::where("user_id", Auth::id())->where("course_id", $course->id)->first() == null) return response()->json([
            //     "status" => true,
            //     "access" => false,
            //     "severity" => "warning",
            //     "error" => "NOT_IN",
            //     "message" => "Você não possuí acesso a este curso",
            //     "course" => CourseMainNotInResource::make($course)
            // ]);

            return response()->json([
                "status" => true,
                "severity" => "success",
                "course" => CourseMainResource::make($course)
            ]);
        }

        $courses = CourseMain::where("name", "ilike", "%" . $request->search . "%")->orderBy("created_at")->paginate($this->paginate);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "courses" => CourseMainResource::collection($courses),
            "pagination" => [
                "current" => $courses->currentPage(),
                "last_page" => $courses->lastPage()
            ]
        ]);
    }

    public function GetOne($course_id) {
        return response()->json([
            "status" => true,
            "severity" => "success",
            "course" => CourseMainResource::make(CourseMain::find($course_id))
        ]);
    }

    public function GetLessons(Request $request, $course_id) {
        return response()->json([
            "status" => true,
            "severity" => "success",
            "lessons" => Lesson::where("course_id", "=", $course_id)->where("title", "ilike", "%" . $request->search . "%")->get()
        ]);
    }

    public function GetFiles(Request $request) {
        if (!isset($request->id)) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Não foi informado o id do curso"
        ]);

        $course = CourseMain::find($request->id);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "files" => $course->Files()->get()
        ]);
    }

    public function GetFree(Request $request) {
        if (isset($request->id)) {
            $course = CourseMain::where("id", $request->id)->where("free", true)->first();
            if ($course === null) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Curso não disponível ou inexistente"
            ]);

            return response()->json([
                "status" => true,
                "severity" => "success",
                "course" => CourseMainResource::make($course)
            ]);
        }
        $courses = CourseMain::where("price", 0)->get();
        return response()->json([
            "status" => true,
            "severity" => "success",
            "courses" => CourseMainResource::collection($courses)
        ]);
    }

    //POST

    public function Create(CourseMainRequest $request) {
        Log::info($request);
        $data = $request->validated();
        
        if ($image = $request->file("image")) {
            $filename = uniqid("course_thumb_") . "." . $image->extension();
            $path = $image->storeAs("courses_thumbnails", $filename, ["disk" => "public"]);
            $data["image"] = $path;
        }

        if ($image = $request->file("cover_image")) {
            $filename = uniqid("course_cover_") . "." . $image->extension();
            $path = $image->storeAs("courses_covers", $filename, ["disk" => "public"]);
            $data["cover_image"] = $path;
        }

        if ($image = $request->file("video_trailer")) {
            $filename = uniqid("course_trailer") . "." . $image->extension();
            $path = $image->storeAs("courses_videos_trailers", $filename, ["disk" => "public"]);
            $data["video_trailer"] = $path;
        }

        $course = new CourseMain();
        if (!($course->fill($data)->save())) return response()->json([
            "status" => false,
            "message" => "Falha ao criar o curso",
            "severity" => "error"
        ]);

        if (isset($data["category_id"])) for ($i = 0; $i < sizeof($data["category_id"]); $i++) {
            $courseCategory = new CoursesCategoryRelation();
            $courseCategory->fill([
                "category_id" => $data["category_id"][$i],
                "course_id" => $course->id
            ])->save();
        }

        if (isset($data["responsible_id"])) for ($i = 0; $i < sizeof($data["responsible_id"]); $i++) {
            $courseResponsible = new CoursesResponsibles();
            $courseResponsible->fill([
                "user_id" => $data["responsible_id"][$i],
                "course_id" => $course->id
            ])->save();
        }

        if (isset($data["tag_id"])) for ($i = 0; $i < sizeof($data["tag_id"]); $i++) {
            $courseTag = new CourseTags();
            $courseTag->fill([
                "tag_id" => $data["tag_id"][$i],
                "course_id" => $course->id
            ])->save();
        }

        return response()->json([
            "status" => true,
            "message" => "Curso criado com sucesso",
            "severity" => "success",
            "courseId" => $course->id
        ]);
    }
    
    public function Update(CourseMainRequest $request) {
        $data = $request->validated();

        if ($image = $request->file("image")) {
            $filename = uniqid("course_thumb_") . "." . $image->extension();
            $path = $image->storeAs("courses_thumbnails", $filename, ["disk" => "public"]);
            $data["image"] = $path;
        }

        if ($image = $request->file("cover_image")) {
            $filename = uniqid("course_cover_") . "." . $image->extension();
            $path = $image->storeAs("courses_covers", $filename, ["disk" => "public"]);
            $data["cover_image"] = $path;
        }

        if ($image = $request->file("video_trailer")) {
            $filename = uniqid("course_trailer") . "." . $image->extension();
            $path = $image->storeAs("courses_videos_trailers", $filename, ["disk" => "public"]);
            $data["video_trailer"] = $path;
        }

        $course = CourseMain::find($data["id"]);
        if (!$course) return response()->json([
            "status" => false,
            "message" => "O curso não consta no nosso banco de dados",
            "severity" => "error"
        ]);

        CoursesCategoryRelation::where("course_id", "=", $data["id"])->delete();
        if (isset($data["category_id"])) for ($i = 0; $i < sizeof($data["category_id"]); $i++) {
            $courseCategoryRelation = new CoursesCategoryRelation();
            $courseCategoryRelation->fill([
                "course_id" => $data["id"],
                "category_id" => $data["category_id"][$i]
            ])->save();
        }

        if (isset($data["responsible_id"])) {
            CoursesResponsibles::where("course_id", "=", $data["id"])->delete();
            for ($i = 0; $i < sizeof($data["responsible_id"]); $i++) {
                $courseResponsible = new CoursesResponsibles();
                $courseResponsible->fill([
                    "user_id" => $data["responsible_id"][$i],
                    "course_id" => $course->id
                ])->save();
            }
        }

        
        CourseTags::where("course_id", "=", $data["id"])->delete();
        if (isset($data["tag_id"])) for ($i = 0; $i < sizeof($data["tag_id"]); $i++) {
            $courseTag = new CourseTags();
            $courseTag->fill([
                "tag_id" => $data["tag_id"][$i],
                "course_id" => $course->id
            ])->save();
        }

        $course->fill($data)->save();
        return response()->json([
            "status" => true,
            "message" => "Curso editado com sucesso",
            "severity" => "success"
        ]);
    }

    public function Delete(CourseMainRequest $request) {
        $data = $request->validated();

        $course = CourseMain::find($data["id"]);
        if (!$course) return response()->json([
            "status" => false,
            "message" => "O curso já não consta no nosso banco de dados",
            "severity" => "error"
        ]);

        $course->delete();
        return response()->json([
            "status" => true,
            "message" => "Curso deletado com sucesso",
            "severity" => "success"
        ]);
    }

    //UTILS

    public function UploadImage(CourseMainRequest $request) {
        $data = $request->validated();
        
        if ($image = $request->file("image")) {
            $filename = uniqid("course_main_content_images") . "." . $image->getClientOriginalExtension();
            $path = $image->storeAs("course_main_content_images", $filename, ["disk" => "public"]);
            $data["image"] = $path;
        }

        return response()->json([
            "image" => $data["image"]
        ]);
    }
}
