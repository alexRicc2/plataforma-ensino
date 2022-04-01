<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserFileRequest;
use App\Models\LessonFiles;
use App\Models\UserFile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class UserFileController extends Controller {
    
    //POST

    public function Log(UserFileRequest $request) {
        $data = $request->validated();

        $data["user_id"] = isset($data["user_id"]) ? $data["user_id"] : Auth::id();
        Log::info("teste");
        $file = LessonFiles::where("id", "=", $data["file_id"])->first();

        if ($file == null) return response()->json([
            "status" => false,
            "severity" => "error",
            "message" => "O arquivo indicado não existe"
        ]);
        else if ($file->type == "video") {
            //Sets the min duration of the video to be considered completed at 70% of the video time
            $minDuration = $file->duration * 0.7;
            if ($data["video_time"] > $minDuration) $data["completed"] = true;
        }

        $userFile = UserFile::where("user_id", "=", $data["user_id"])->where("file_id", "=", $data["file_id"])->first();
        if ($userFile == null) $userFile = new UserFile();
        $userFile->fill($data)->save();
        $userFile->touch();//forces updated_at to be changed

        return response()->json([
            "status" => true,
            "severity" => "success",
            "message" => "Arquivo sincronizado com sucesso",
            "userfile" => $userFile
        ]);
    }

}
