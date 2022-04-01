<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailNameRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
            case "create":
                return [
                  "email" => "required",
                  "name" => "required",
                ];
                break;
            case "activeaccount":
                return [
                    "activate_session_id" => "required",
                    "password" => "required"
                ];
            case "delete":
            case "sendlink":
                return [
                    "id" => "required"
                ];
                break;
            default:
                return [];
                break;
        }
    }
}
