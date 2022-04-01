<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserFileRequest extends FormRequest {

    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
            case "log":
                return [
                    "user_id" => "sometimes",
                    "file_id" => "required",
                    "video_time" => "sometimes",
                    "completed" => "sometimes"
                ];
                break;
            default:
                return [];
                break;
        }
    }
}
