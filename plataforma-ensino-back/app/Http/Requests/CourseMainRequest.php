<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseMainRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
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
                    "tag_id" => "sometimes"
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
                    "tag_id" => "sometimes"
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
