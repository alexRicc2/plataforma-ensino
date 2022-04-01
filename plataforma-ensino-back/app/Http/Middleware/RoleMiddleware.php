<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class RoleMiddleware {
    public function handle(Request $request, Closure $next, ...$roles) {
        $user = $request->user();

        if ($user!=null) {
            if ($user->exists()) {
                $role = $user->Role()->first()->key;
                if (in_array($role, $roles)) return $next($request);
                else return response()->json([
                    "status" => false,
                    "severity" => "error",
                    "message" => "Você precisa ser administrador"
                ], 403);
            } else return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Usuário não achado"
            ], 403);
        } else return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Token inválido"
        ], 403);
    }
}
