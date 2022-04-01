<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailActionsRequest extends FormRequest {

    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
            case "create":
                return [
                    "email_id" => "required",
                    "general_description" => "required",
                    "action_description" => "required"
                ];
                break;
            case "alter":
                return [
                    "id" => "required",
                    "general_description" => "required",
                    "action_description" => "required"
                ];
                break;
            case "delete":
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
