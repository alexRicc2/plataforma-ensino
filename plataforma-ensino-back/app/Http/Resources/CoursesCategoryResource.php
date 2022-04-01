<?php

namespace App\Http\Resources;

use App\Models\UserListCourse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class CoursesCategoryResource extends JsonResource {

    public function toArray($request) {
        $data = parent::toArray($request);
        $courses = $this->Courses()->get();
        foreach ($courses as $course) {
            $lessons = [];
            foreach ($course->Lessons()->get() as $lesson) {
                $lesson["files"] = $lesson->Files();
                $lessons[] = $lesson;
            }
            $course["lessons"] = $lessons;
            $course["listed"] = UserListCourse::where("course_id", "=", $course->id)->where("user_id", "=", $request->userId)->exists();
        }
        $data["courses"] = $courses;
        return $data;
    }
}
