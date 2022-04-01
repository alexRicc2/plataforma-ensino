<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmailRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
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
