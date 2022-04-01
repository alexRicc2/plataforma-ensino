<?php

namespace App\Http\Controllers;

use App\Http\Requests\CoursesCategoryRequest;
use App\Http\Resources\CoursesCategoryResource;
use App\Models\CoursesCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CoursesCategoryController extends Controller {

    protected $paginate = 10;

    //GET

    public function Get(Request $request) {
        $category = CoursesCategory::where("name", "ilike", $request->search . "%")->paginate($this->paginate);
        
        return response()->json([
            "status" => true,
            "severity" => "success",
            "categories" => CoursesCategoryResource::collection($category),
            "pagination" => [
                "last_page" => $category->lastPage()
            ]
        ]);
    }

    public function GetOne($category_id) {
        return response()->json([
            "status" => true,
            "severity" => "success",
            "category" => CoursesCategory::find($category_id)
        ]);
    }

    //POST

    public function Create(CoursesCategoryRequest $request) {
        Log::info($request);
        $data = $request->validated();
        $data["key"] = strtolower($data["name"]);
        $category = new CoursesCategory();
        $category->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Categoria de curso criada com sucesso"
        ]);
    }

    public function Update(CoursesCategoryRequest $request) {
        $data = $request->validated();
        $data["key"] = strtolower($data["name"]);

        $category = CoursesCategory::firstWhere("id", "=", $data["id"]);
        if ($category == null) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Essa categoria não consta no banco de dados"
        ]);

        $category->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Categoria de curso editada com sucesso"
        ]);
    }

    public function Delete(CoursesCategoryRequest $request) {
        $data = $request->validated();

        $category = CoursesCategory::firstWhere("id", "=", $data["id"]);
        if ($category == null) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Essa categoria já não consta no banco de dados"
        ]);

        $category->delete();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Categoria de curso deletada com sucesso"
        ]);
    }

}
