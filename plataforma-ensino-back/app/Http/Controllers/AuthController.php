<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Http\Resources\UserResource;
use App\Models\Email;
use App\Models\EmailActions;
use App\Models\EmailName;
use App\Models\User;
use App\Models\UserRole;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(AuthRequest $request)
    {
        $data = $request->validated();

        // if (!Email::where("email", "=", $data["email"])->exists()) {
        //     $emailLog = new Email();
        //     $emailLog->fill([
        //         "email" => $data["email"]
        //     ])->save();
        // }

        EmailName::firstOrNew(
            ["email" => $data["email"]],
            ["email" => $data["email"], "name" => $data["name"]]
        )->save();

        $user_email = User::where('email', '=', $data['email'])->first();
        if ($user_email != null) {
            return response()->json(['errors' => ['error' => 'Este email já está em uso. Modifique-o e tente novamente']]);
        }
        // if (isset($data['imagem'])) {

        //     $foto = $data['imagem'];
        //     $extension = explode(';', explode('/', explode(':', $foto)[1])[1])[0];
        //     $name = 'fotos_perfil/' . uniqid('foto_') . '.' . $extension;
        //     $image = $foto;  // your base64 encoded
        //     $image = str_replace('data:image/' . $extension . ';base64,', '', $image);
        //     $image = base64_decode($image);
        //     Storage::disk('public')->put($name, $image);
        //     // Log::info($filename);
        //     $data['imagem'] = $name;
        // } else {
        //     unset($data['imagem']);
        // }

        if ($image = $request->file("profile_image")) {
            $filename = uniqid("profile_images_") . "." . $image->extension();
            $path = $image->storeAs("profile_images", $filename, ["disk" => "public"]);
            $data["profile_image"] = $path;
        }

        if (!isset($data["role_id"])) {
            $roleId = UserRole::firstWhere("key", "=", "aluno")->id;
            $data["role_id"] = $roleId;
        }

        $user = new User();

        $user->fill($data);

        $user->fill(['password' => bcrypt($data['password'])]);
        $user->save();
        // $user->roles()->Sync([Role::where('key', '=', 'cliente')->first()->id]);

        $emailName = EmailName::where("email", "=", $data["email"])->first();
        if ($emailName != null) {
            $emailAction = new EmailActions();
            $emailAction->fill([
                "email_id" => $emailName->id,
                "general_description" => "Conta criada com este email"
            ])->save();
        }

        return response()->json([
            'success'   =>  true,
            "status" => true,
            "Conta criada com sucesso"
            // 'user'      =>  UserResource::make($user)
        ], 200);
    }


    public function login(AuthRequest $request)
    {
        $data = $request->validated();
        // $request->validate([
        //     'email'       => 'string|email',
        //     'password'    => 'required|string',
        //     'remember_me' => 'boolean'
        // ]);

        $user = User::firstWhere('email', $data['email']);

        if (!$user) {
            return response()->json([
                'errors' => ['error' => 'Não achamos nenhuma conta com este e-mail. Por favor tente novamente ou '],
                "link" => [
                    "href" => "/register",
                    "message" => "crie uma nova conta."
                ]
            ]);
        }

        // $credentials = request(['email', 'password']);
        // if (!Auth::attempt($credentials)) {
        //     return response()->json([
        //         'message' => 'Email ou Senha Inválidos!'
        //     ], 401);
        // }
       
        if (!password_verify($data['password'], $user->password)) {
            return response()->json(['errors' => ['error' => 'Email ou senha incorretos!']]);
        }
        $tokenResult = $user->createToken('Personal Access Token');
        $token       = $tokenResult->token;
        // if ($request->remember_me) {
        //     $token->expires_at = Carbon::now()->addWeeks(1);
        // }
        $token->save();
        return response()->json([
            'status' => true,
            'access_token' => $tokenResult->accessToken,
            'token_type'   => 'Bearer',
            'expires_at'   => Carbon::parse(
                $tokenResult->token->expires_at
            )->format('d/m/Y H:i'),
            'user'      =>  UserResource::make($user)
        ]);
    }

    public function user()
    {
        return response()->json([
            'user' =>  UserResource::make(request()->user())
        ]);
    }

    public function edit_profile(AuthRequest $request) {
        $data = $request->validated();
        if (Auth::id() != $data["id"] || User::find(Auth::id())->IsAdmin()) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Você não tem permissão para alterar este perfil",
            "redirectTo" => "/home"
        ]);
        $user = User::find($data["id"]);

        if (!$user) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Este usuário não consta no nosso banco de dados"
        ]);

        if ($image = $request->file("profile_image")) {
            $filename = uniqid("profile_images_") . "." . $image->extension();
            $path = $image->storeAs("profile_images", $filename, ["disk" => "public"]);
            $data["profile_image"] = $path;
        }

        if (isset($data["signature"])) {
            $image = $data["signature"];
            $extension = explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];

            $replace = substr($image, 0, strpos($image, ',')+1); 
            $image = str_replace($replace, '', $image); 
            $image = str_replace(' ', '+', $image); 

            $fileName = "signature_images/" . uniqid("signature_image_") . "." . $extension;
            $path = Storage::disk("public")->put($fileName, base64_decode($image));
            $data["signature"] = $fileName;
        }

        if (isset($data['password'])) $data['password'] = bcrypt($data['password']);
        else unset($data['password']);
      
        $user->fill($data);

        $user->save();


        return response()->json([
            "status"   =>  true,
            "severity" => "success",
            "message" => "Perfil editado com sucesso",
            "user"      =>  UserResource::make($user)
        ], 200);
    }
}
