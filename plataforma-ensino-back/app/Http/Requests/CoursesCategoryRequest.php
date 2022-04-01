<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CoursesCategoryRequest extends FormRequest
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
        switch (strtolower($this->route()->getActionMethod())) {
            case "create":
                return [
                    "name" => "required"
                ];
                break;
            case "update":
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
