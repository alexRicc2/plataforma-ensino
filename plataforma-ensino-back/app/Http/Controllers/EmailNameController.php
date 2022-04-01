<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmailNameRequest;
use App\Http\Resources\EmailNameResource;
use App\Mail\SendAccountLinkMail;
use App\Models\ActivateAccountSession;
use App\Models\EmailActions;
use App\Models\EmailName;
use App\Models\GeneralStyle;
use App\Models\User;
use App\Models\UserRole;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class EmailNameController extends Controller {
    
    protected $paginate = 50;

    //GET

    public function Get(Request $request) {
        $email = EmailName::where("email", "ilike", "%" . $request->search . "%")->latest()->paginate(isset($request->paginate)? $request->paginate : $this->paginate);
        
        return response()->json([
            "status" => true,
            "severity" => "success",
            "emails" => EmailNameResource::collection($email),
            "pagination" => [
              "lastPage" => $email->lastPage()
            ]
        ]);
    }

    //POST

    public function Create(EmailNameRequest $request){
      $data = $request->validated();
      $emailName = EmailName::firstOrNew(["email" => $data["email"]]);
      $emailName->fill($data)->save();
      $emailAction = new EmailActions();
      $emailAction->fill([
        "email_id" => $emailName->id,
        "general_description" => "Email inserido no sistema"
      ])->save();
      return response()->json([
        "status" => true,
        "severity" => "success",
        "message" => "Cadastrado feito com sucesso"
      ]);
    }

    public function Delete(EmailNameRequest $request) {
        $data = $request->validated();

        $email = EmailName::firstWhere("id", "=", $data["id"]);

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

    public function SendLink(EmailNameRequest $request) {
      $data = $request->validated();
      $email = EmailName::find($data["id"]);
      if ($email == null) return response()->json([
          "status" => false,
          "severity" => "error",
          "message" => "E-mail não consta no banco de dados"
      ]);
      else if ($email->HasActiveAccount()) return response()->json([
        "status" => false,
        "severity" => "warning",
        "message" => "E-mail já está presente em uma conta ativa"
      ]);
      
      ActivateAccountSession::where("emailname_id", $email->id)->delete();

      $activateAccountSession = new ActivateAccountSession();
      $activateAccountSession->fill([
        "emailname_id" => $email->id
      ])->save();

      $details = [
        "name" => $email->name,
        "emailname_id" => $activateAccountSession->id
      ];

      Mail::to($email->email)->send(new SendAccountLinkMail($details));

      return response()->json([
        "status" => true,
        "severity" => "success",
        "message" => "E-mail enviado com sucesso!"
      ]);
    }

    public function ActiveAccount(EmailNameRequest $request) {
      $data = $request->validated();
      
      $activateAccountSession = ActivateAccountSession::find($data["activate_session_id"]);
      if ($activateAccountSession == null) return response()->json([
        "status" => false,
        "severity" => "error",
        "message" => "Sessão inválida! Por favor peça para um responsável reenviar o link de ativação de conta"
      ]);

      $expirationLimit = GeneralStyle::first()->expiration_in_seconds;
      if ($expirationLimit != null || $expirationLimit == 0) {
        $limitDate = Carbon::parse($activateAccountSession->created_at)->addSeconds($expirationLimit);
        //if now has passed from the limit date, cancel activate session
        if (Carbon::now()->gt($limitDate)) {
          $activateAccountSession->delete();
          return response()->json([
            "status" => false,
            "severity" => "warning",
            "message" => "Sessão expirada! Por favor peça para um responsável enviar um novo link de ativação de conta"
          ]);
        }
      }

      $email = EmailName::find($activateAccountSession->emailname_id);

      $activateAccountSession->delete();

      if ($email == null) return response()->json([
        "status" => false,
        "severity" => "error",
        "message" => "Código do e-mail não consta no banco de dados"
      ]);

      $user = User::where("email", $email->email)->first();
      if ($user != null) return response()->json([
        "status" => false,
        "severity" => "error",
        "message" => "Já existe uma conta com esse e-mail"
      ]);


      $user = new User();
      $userData = [
        "name" => $email->name,
        "email" => $email->email,
        "password" => bcrypt($data['password']),
        "role_id" => UserRole::where("key", "aluno")->first()->id
      ];

      $user->fill($userData)->save();

      return response()->json([
        "status" => true,
        "severity" => "success",
        "message" => "Conta ativada com sucesso"
      ]);
    }

}
