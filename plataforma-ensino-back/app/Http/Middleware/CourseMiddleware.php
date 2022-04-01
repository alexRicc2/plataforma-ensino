<?php

namespace App\Http\Middleware;

use App\Models\User;
use App\Models\UserCourse;
use Closure;
use Illuminate\Http\Request;

class CourseMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        $user = $request->user();

        if ($user!=null) {
            if (isset($request->id)) {
                $userCourse = UserCourse::where("course_id", "=", $request->id)->where("user_id", "=", $user->id);
                if ($userCourse->exists()) return $next($request);
                else return response()->json([
                    "status" => false,
                    "severity" => "error",
                    "message" => "Não está no curso"
                ], 403);
            }
            return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Sem curso referenciado"
            ], 403);
        }

        return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Usuário não achado"
        ], 403);
    }
}
