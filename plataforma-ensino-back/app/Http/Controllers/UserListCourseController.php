<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserListCourseRequest;
use App\Http\Resources\UserListCourseResource;
use App\Models\CourseMain;
use App\Models\UserListCourse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserListCourseController extends Controller {

    //GET

    public function Get(Request $request) {
        Log::info($request->userId);
        if (isset($request->userId)) {
            $userList = UserListCourse::where("user_id", "=", $request->userId)->get();
            return response()->json([
                "status" => true,
                "severity" => "success",
                "list" => UserListCourseResource::collection($userList)
            ]);
        }
        return UserListCourseResource::collection(UserListCourse::all());
    }

    //POST

    public function Create(UserListCourseRequest $request) {
        $data = $request->validated();

        $userList = UserListCourse::where("course_id", "=", $data["course_id"])->where("user_id", "=", $data["user_id"]);
        if ($userList->exists()) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Usuário já possuí este curso em sua lista"
        ]);

        $userList = new UserListCourse();
        $userList->fill($data)->save();

        $course = CourseMain::firstWhere("id", "=", $data["course_id"]);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "$course->name adicionado na sua lista"
        ]);
    }

    public function Delete(UserListCourseRequest $request) {
        $data = $request->validated();

        $userList = UserListCourse::where("course_id", "=", $data["course_id"])->where("user_id", "=", $data["user_id"]);

        if (!$userList->exists()) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Usuário já não possuí este curso em sua lista"
        ]);

        $userList->delete();

        $course = CourseMain::firstWhere("id", "=", $data["course_id"]);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "$course->name foi removido da sua lista"
        ]);
    }

}
