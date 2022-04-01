<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserListCourseRequest extends FormRequest
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
            case "delete":
            case "create":
                return [
                    "user_id" => "required",
                    "course_id" => "required"
                ];
                break;
            default:
                return [];
                break;
        }
    }
}
