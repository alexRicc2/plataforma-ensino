<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LessonRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
            case "create":
                return [
                    "module_id" => "required",
                    "title" => "required",
                    "description" => "required",
                    "videos" => "sometimes",
                    "files" => "nullable",
                    "questions" => "sometimes",
                    "allow_answer_reveal" => "sometimes",
                    "min_percentage" => "sometimes"
                ];
                break;
            case "update":
                return [
                    "id" => "required",
                    "title" => "required",
                    "description" => "required",
                    "videos" => "nullable",
                    "files" => "nullable",
                    "videos_to_delete" => "nullable",
                    "docs_to_delete" => "nullable",
                    "questions" => "sometimes",
                    "allow_answer_reveal" => "sometimes",
                    "min_percentage" => "sometimes"
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
