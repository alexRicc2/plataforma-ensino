<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ModuleRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
            case "create":
                return [
                    "name" => "required",
                    "course_id" => "required",
                    "description" => "sometimes"
                ];
                break;
            case "alter":
                return [
                    "id" => "required",
                    "name" => "required",
                    "description" => "sometimes"
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
