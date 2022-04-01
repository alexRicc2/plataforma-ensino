<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFileCommentRequest;
use App\Http\Resources\UserFileCommentResource;
use App\Models\UserFileComment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserFileCommentController extends Controller {

    //GET

    public function Get(Request $request) {
        if ($request->fileId) {
            $fileComments = UserFileComment::where("file_id", $request->fileId)->whereNull("reply_to")->orderBy("created_at", "DESC")->paginate(20);
            return response()->json([
                "status" => true,
                "severity" => "success",
                "comments" => UserFileCommentResource::collection($fileComments),
                "pagination" => [
                    "lastPage" => $fileComments->lastPage()
                ]
            ]);
        }
        return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Nenhum id foi passado"
        ]);
    }

    //POST

    public function Create(UserFileCommentRequest $request) {
        $data = $request->validated();
        $data["user_id"] = Auth::id();

        $comment = new UserFileComment();
        $comment->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Comentário feito com sucesso"
        ]);
    }

    public function Alter(UserFileCommentRequest $request) {
        $data = $request->validated();
        $data["user_id"] = Auth::id();

        $comment = UserFileComment::find($data["id"]);
        $comment->fill($data)->save();

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Comentário editado com sucesso"
        ]);
    }

    public function Delete(UserFileCommentRequest $request) {
        $data = $request->validated();
        $data["user_id"] = Auth::id();

        $comment = UserFileComment::find($data["id"]);
        if ($comment != null) $comment->delete();
        else return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "Falha ao achar este comentário"
        ]);

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Comentário feito com sucesso"
        ]);
    }

}