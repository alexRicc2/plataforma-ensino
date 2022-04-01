<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserCourseRequest;
use App\Models\CourseMain;
use App\Models\User;
use App\Models\UserCourse;
use Illuminate\Http\Request;

class UserCourseController extends Controller {

    protected $paginate = 20;

    //GET

    public function GetFromCourse(Request $request, $course_id) {
        $usersIn = UserCourse::where("course_id", "=", $course_id)->get()->pluck("user_id");
        return response()->json([
            "status" => true,
            "severity" => "success",
            "usersIn" => User::whereIn("id", $usersIn)->where(function ($q) use ($request) {
                $q->where("name", "ilike", "%" . $request->search . "%")->orWhere("email", "ilike", "%" . $request->search . "%");
            })->paginate($this->paginate),
            "usersNotIn" => User::whereNotIn("id", $usersIn)->where(function ($q) use ($request) {
                $q->where("name", "ilike", "%" . $request->search . "%")->orWhere("email", "ilike", "%" . $request->search . "%");
            })->limit(20)->get()
        ]);
    }

    public function GetFromUser($user_id) {
        $courses = UserCourse::where("user_id", "=", $user_id)->get()->pluck("course_id");
        return response()->json([
            "status" => true,
            "severity" => "success",
            "users" => User::whereIn("id", $courses)->get()
        ]);
    }

    //POST

    public function Create(UserCourseRequest $request) {
        $data = $request->validated();

        for ($i = 0; $i < sizeof($data["user_id"]); $i++) {
            if (UserCourse::where("course_id", "=", $data["course_id"])->where("user_id", "=", $data["user_id"])->exists()) continue;

            $userCourse = new UserCourse();
            $userCourse->fill([
                "course_id" => $data["course_id"],
                "user_id" => $data["user_id"][$i]
            ])->save();
            // $userCourse->HandleGroupCreation();
        }

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => sizeof($data["user_id"]) . " aluno(s) adicionado(s) com sucesso"
        ]);
    }
    
    public function Delete(UserCourseRequest $request) {
        $data = $request->validated();

        $userCourse = UserCourse::where("user_id", "=", $data["user_id"])->where("course_id", "=", $data["course_id"]);

        if (!$userCourse->exists()) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Relação entre usuário e curso inexistente"
        ]);

        $userCourse->first()->RemoveFromAnyAutoGroup();
        $userCourse->delete();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Usuário removido do curso"
        ]);
    }

    public function Adquire(UserCourseRequest $request) {
        $data = $request->validated();

        $course = CourseMain::find($data["course_id"]);
        if (!$course->InDateRange()) return response()->json([
            "status" => false,
            "severity" => "warning",
            "message" => "Este curso não está disponível para inscrição no momento"
        ]);

        $userCourse = UserCourse::firstOrNew(
            ["course_id" => $data["course_id"], "user_id" => $data["user_id"]],
            ["course_id" => $data["course_id"], "user_id" => $data["user_id"]]
        );
        $userCourse->save();
        $userCourse->HandleGroupCreation();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Curso adquirido com sucesso"
        ]);
    }

}
