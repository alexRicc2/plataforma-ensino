<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TagsRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        switch (strtolower($this->route()->getActionMethod())) {
            case "create":
                return [
                    "name" => "required"
                ];
                break;
            case "alter":
                return [
                    "id" => "required",
                    "name" => "required"
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
