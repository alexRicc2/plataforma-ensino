<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class CourseMainResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);
        $data["categories"] = $this->Categories()->get();
        $data["responsibles"] = $this->Responsibles();
        $data["tags"] = $this->Tags()->get();

        $data["modules"] = $this->Modules();
        $data["first_file_id"] = $this->FirstLesson();
        
        $userCourse = $this->UserCourse()->where("user_id", "=", Auth::id())->first();
        if ($userCourse != null) $data["lastSeenLesson"] = $userCourse->LastSeenLesson()->first();
        if (isset($request->userId)) {
            $data["averagePercentage"] = $this->GetPercentage($request->userId);
        }

        return $data;
    }
}
