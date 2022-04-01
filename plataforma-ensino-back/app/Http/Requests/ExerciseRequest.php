<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExerciseRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
            case "submit":
            case "log":
                return [
                    "lesson_id" => "required",
                    "answers" => "required"
                ];
                break;
            default:
                return [];
                break;
        }
    }
}
