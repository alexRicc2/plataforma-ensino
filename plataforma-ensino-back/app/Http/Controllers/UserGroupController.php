<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserGroupRequest;
use App\Models\UserGroup;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserGroupController extends Controller {

    //GET

    //POST

    public function Create(UserGroupRequest $request) {
        $data = $request->validated();

        for ($i = 0; $i < sizeof($data["user_id"]); $i++) {
            $userGroup = UserGroup::firstOrNew(
                ["group_id" => $data["group_id"], "user_id" => $data["user_id"][$i]],
                ["group_id" => $data["group_id"], "user_id" => $data["user_id"][$i]]
            );
            $userGroup->save();
            $userGroup->AddToCourses();
        }

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => sizeof($data["user_id"]) . " aluno(s) adicionado(s) com sucesso"
        ]);
    }
    
    public function Delete(UserGroupRequest $request) {
        $data = $request->validated();

        $userGroup = UserGroup::where("user_id", "=", $data["user_id"])->where("group_id", "=", $data["group_id"]);

        if (!$userGroup->exists()) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Relação entre usuário e grupo inexistente"
        ]);

        $userGroup->first()->DeleteFromCourses();
        $userGroup->delete();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Usuário removido do grupo"
        ]);
    }

}
