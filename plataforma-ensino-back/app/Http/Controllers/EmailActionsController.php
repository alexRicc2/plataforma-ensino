<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailActionsRequest;
use App\Http\Resources\EmailActionsResource;
use App\Models\EmailActions;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class EmailActionsController extends Controller {

    protected $paginate = 20;

    //GET

    public function Get(Request $request) {

        if (isset($request->emailId)) {
            $emailActions = EmailActions::where("email_id", "=", $request->emailId)->orderBy("created_at", "DESC")->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);
            
            return response()->json([
                "status" => true,
                "severity" => "success",
                "actions" => EmailActionsResource::collection($emailActions),
                "pagination" => [
                    "lastPage" => $emailActions->lastPage()
                ]
            ]);
        } else if (isset($request->actionId)) {
            $emailAction = EmailActions::find($request->actionId);
            if ($emailAction == null) return response()->json([
                "status" => false,
                "severity" => "error",
                "message" => "Registro de ação não encontrado"
            ]);

            return response()->json([
                "status" => true,
                "severity" => "success",
                "action" => EmailActionsResource::make($emailAction)
            ]);
        }

        return response()->json([
            "status" => true
        ]);
    }

    //POST

    public function Create(EmailActionsRequest $request) {
        $data = $request->validated();

        $data["user_id"] = Auth::id();
        Log::info(Auth::id());
        $emailAction = new EmailActions();
        $emailAction->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Registro criado com sucesso"
        ]);
    }

    public function Alter(EmailActionsRequest $request) {
        $data = $request->validated();

        $emailAction = EmailActions::find($data["id"]);
        if ($emailAction == null) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Registro de ação não encontrado"
        ]);

        $emailAction->fill($data)->save();
        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Registro editado com sucesso"
        ]);
    }

    public function Delete(EmailActionsRequest $request) {
        $data = $request->validated();
        $emailAction = EmailActions::find($data["id"]);
        if ($emailAction == null) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Registro de ação não encontrado"
        ]);

        $emailAction->delete();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Registro deletado com sucesso"
        ]);
    }

}
