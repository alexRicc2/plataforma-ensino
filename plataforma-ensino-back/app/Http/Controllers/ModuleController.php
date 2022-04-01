<?php

namespace App\Http\Controllers;

use App\Http\Requests\ModuleRequest;
use App\Http\Resources\CourseMainResource;
use App\Http\Resources\LessonResource;
use App\Http\Resources\ModuleResource;
use App\Http\Resources\UserResource;
use App\Models\CourseMain;
use App\Models\CourseModule;
use App\Models\Module;
use App\Models\User;
use Illuminate\Http\Request;

class ModuleController extends Controller {

    protected $paginate = 10;

    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $module = Module::find($request->id);
            if (!$module->exists()) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Módulo não encontrado"
            ]);

            $lessons = $module->Lessons($request->lesson_search)->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);

            return response()->json([
                "status" => true,
                "severity" => "success",
                "module" => ModuleResource::make($module),
                "lessons" => LessonResource::collection($lessons),
                "lessons_pagination" => [
                    "current" => $lessons->currentPage(),
                    "last_page" => $lessons->lastPage()
                ]
            ]);
        }

        
        if (isset($request->courseId)) {
            $modulesIds = CourseModule::where("course_id", "=", $request->courseId)->pluck("module_id");
            $modules = Module::whereIn("id", $modulesIds)->where("name", "ilike", $request->search . "%")->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);
        } else {
            $modules = Module::where("name", "ilike", $request->search . "%")->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);
        }

        $response = [
            "status" => true,
            "severity" => "success",
            "modules" => ModuleResource::collection($modules),
            "user" => UserResource::make(User::find($request->userId)),
            "pagination" => [
                "current" => $modules->currentPage(),
                "last_page" => $modules->lastPage()
            ]
        ];

        if (isset($request->courseId)) $response["course"] = CourseMainResource::make(CourseMain::find($request->courseId));

        return response()->json($response);
    }

    //POST

    public function Create(ModuleRequest $request) {
        $data = $request->validated();

        $module = new Module();
        $module->fill($data)->save();

        $courseModule = new CourseModule();
        $courseModule->fill([
            "course_id" => $data["course_id"],
            "module_id" => $module->id
        ])->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Módulo criado com sucesso",
            "module" => ModuleResource::make($module)
        ]);
    }

    public function Alter(ModuleRequest $request) {
        $data = $request->validated();

        $module = Module::find($data["id"]);
        if (!$module->exists()) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Esse módulo não consta no banco de dados"
        ]);

        $module->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Módulo editado com sucesso",
            "module" => ModuleResource::make($module)
        ]);
    }

    public function Delete(ModuleRequest $request) {
        $data = $request->validated();

        $module = Module::find($data["id"]);
        if (!$module->exists()) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Esse módulo não consta no banco de dados"
        ]);

        CourseModule::where("module_id", "=", $module->id)->delete();

        $module->delete();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Módulo deletado com sucesso"
        ]);
    }

}
