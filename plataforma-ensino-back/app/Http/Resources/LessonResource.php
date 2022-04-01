<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class LessonResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);
        $data["files"] = $this->Files();
        $data["course"] = $this->Course()->first();
        $data["questions"] = $this->Questions(isset($request->userId) ? $request->userId : Auth::id());
        if (isset($request->userId)) $data["lessonExerciseStatistic"] = $this->ExercisesStatistics($request->userId);
        return $data;
    }
}
