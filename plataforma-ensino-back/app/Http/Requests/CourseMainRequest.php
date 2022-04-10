<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseMainRequest extends FormRequest {
    public function authorize() {
        return true;
    }

    public function rules() {
        switch(strtolower($this->route()->getActionMethod())) {
            case "create":
                return [
                    "name" => "required",
                    "description" => "required",
                    "image" => "required",
                    "created_by" => "required",//user_id
                    "category_id" => "sometimes",
                    "responsible_id" => "sometimes",
                    "tag_id" => "sometimes",
                    "price" => "sometimes",
                    "free" => "sometimes",
                    "course_content" => "sometimes",
                    "what_will_learn" => "sometimes",
                    "cover_image" => "nullable",
                    "video_trailer" => "nullable"
                ];
                break;
            case "update":
                return [
                    "id" => "required",
                    "name" => "required",
                    "description" => "required",
                    "image" => "required",
                    "category_id" => "sometimes",
                    "responsible_id" => "sometimes",
                    "tag_id" => "sometimes",
                    "price" => "sometimes",
                    "free" => "sometimes",
                    "course_content" => "sometimes",
                    "what_will_learn" => "sometimes",
                    "cover_image" => "nullable",
                    "video_trailer" => "nullable"
                ];
                break;
            case "delete":
                return [
                    "id" => "required"
                ];
                break;
            case "uploadimage":
                return [
                    "image" => "required"
                ];
                break;
            default:
                return [];
                break;
        }
    }
}
