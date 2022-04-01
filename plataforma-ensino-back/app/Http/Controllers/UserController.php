<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Http\Resources\UserResource;
use App\Models\Email;
use App\Models\User;
use App\Models\UserCourse;
use App\Models\UserRole;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class UserController extends Controller {

    protected $paginate = 50;
    protected $limit = 20;

    //GET

    public function Get(Request $request) {
        if (isset($request->id)) {
            $user = User::find($request->id);
            return response()->json([
                "status" => true,
                "severity" => "success",
                "user" => UserResource::make($user)
            ]);
        }

        $user = User::where("name", "ilike", "%" . $request->search . "%")->orWhere("email", "ilike", "%" . $request->search . "%")->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);
        return response()->json([
            "status" => true,
            "severity" => "success",
            "users" => UserResource::collection($user),
            "pagination" => [
                "current" => $user->currentPage(),
                "last_page" => $user->lastPage()
            ]
        ]);
    }

    // public function GetOne($userId) {
    //     return User::find($userId);
    // }

    public function GetPrivileged(Request $request) {
        $roles = UserRole::where("key", "=", "admin")->orWhere("key", "=", "professor")->limit(isset($request->limit) ? $request->limit : $this->limit)->pluck("id");
        $users = User::whereIn("role_id", $roles)->get();
        return response()->json([
            "status" => true,
            "severity" => "success",
            "users" => UserResource::collection($users)
        ]);
    }

    public function AccountExists($email) {
        $exists = User::where("email", "=", $email)->exists();
        if (!Email::where("email", "=", $email)->exists()) {
            $emailLog = new Email();
            $emailLog->fill([
                "email" => $email
            ])->save();
        }
        return response()->json([
            "status" => true,
            "exists" => $exists
        ]);
    }

    public function AccountStatistics($user_id) {
        return response()->json([
            "status" => true,
            "coursesCount" => UserCourse::where("user_id", "=", $user_id)->count()
        ]);
    }

    //POST

    public function Delete(UserRequest $request) {
        $data = $request->validated();
        
        $account = User::find($data["id"]);
        if ($account->count() == 0) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Esta conta não consta no banco de dados"
        ]);

        $account->delete();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Conta deletada com sucesso"
        ]);
    }

}
