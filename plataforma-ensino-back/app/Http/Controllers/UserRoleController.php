<?php

namespace App\Http\Controllers;

use App\Models\UserRole;
use Illuminate\Http\Request;

class UserRoleController extends Controller {
    
    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $role = UserRole::find($request->id);
            return response()->json([
                "status" => true,
                "severity" => "success",
                "role" => $role
            ]);
        }

        $role = UserRole::all();
        return response()->json([
            "status" => true,
            "severity" => "success",
            "roles" => $role
        ]);
    }

}
