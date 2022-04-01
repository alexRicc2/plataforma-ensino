<?php

namespace App\Http\Controllers;

use App\Http\Requests\CourseMainRequest;
use App\Http\Resources\CourseMainResource;
use App\Models\CourseMain;
use App\Models\CoursesCategory;
use App\Models\CoursesCategoryRelation;
use App\Models\CoursesResponsibles;
use App\Models\CourseTags;
use App\Models\Lesson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseMainController extends Controller {
    
    protected $paginate = 20;

    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $course = CourseMain::find($request->id);
            if ($course->exists()) return response()->json([
                "status" => true,
                "severity" => "success",
                "course" => CourseMainResource::make($course)
            ]);
            else return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "O curso não foi achado"
            ]);
        }

        $courses = CourseMain::where("name", "ilike", $request->search . "%")->paginate($this->paginate);

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
            "lessons" => Lesson::where("course_id", "=", $course_id)->where("title", "ilike", $request->search . "%")->get()
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

    //POST

    public function Create(CourseMainRequest $request) {
        $data = $request->validated();
        Log::info($request);
        if ($image = $request->file("image")) {
            $filename = uniqid("course_thumb_") . "." . $image->extension();
            $path = $image->storeAs("courses_thumbnails", $filename, ["disk" => "public"]);
            $data["image"] = $path;
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

}
