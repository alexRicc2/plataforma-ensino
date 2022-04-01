<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailRequest;
use App\Models\Email;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class EmailController extends Controller {
    
    protected $paginate = 50;

    //GET

    public function Get(Request $request) {
        $email = Email::where("email", "ilike", "%" . $request->search . "%")->paginate(isset($request->paginate) ? $request->paginate : $this->paginate);
        return response()->json([
            "status" => true,
            "severity" => "success",
            "emails" => $email
        ]);
    }

    //POST

    public function Delete(EmailRequest $request) {
        $data = $request->validated();

        $email = Email::firstWhere("id", "=", $data["id"]);

        if ($email == null) return response()->json([
            "status" => false,
            "message" => "Email não encontrado nos registros"
        ]);
        
        $email->delete();

        return response()->json([
            "status" => true,
            "message" => "Email deletado dos registros"
        ]);
    }

}
