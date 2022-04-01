<?php

namespace App\Http\Controllers;

use App\Models\CourseMain;
use App\Models\CoursesCategory;
use App\Models\Tags;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CourseRelatedController extends Controller {
    //Brings all the info that might be related to the courses such as categories and tags

    public function Get(Request $request) {

        if (isset($request->id)) {
            $course = CourseMain::find($request->id);
            if (!$course->exists()) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Curso não consta no banco de dados"
            ]);

            return response()->json([
                "status" => true,
                "severity" => "success",
                "modules" => $course->Modules()
            ]);
        }

        $categories = CoursesCategory::all();
        $tags = Tags::all();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "categories" => $categories,
            "tags" => $tags
        ]);
    }

    public function Modules(Request $request) {
        if (isset($request["course_id"])) {
            Log::info($request["course_id"]);
            $course = CourseMain::find($request["course_id"]);
            if (!$course->exists()) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Curso não consta no banco de dados"
            ]);

            return response()->json([
                "status" => true,
                "severity" => "success",
                "modules" => $course->Modules($request->search)
            ]);
        }
    }

}
