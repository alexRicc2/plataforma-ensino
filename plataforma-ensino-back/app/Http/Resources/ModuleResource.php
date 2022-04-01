<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Log;

class ModuleResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);

        $data["course"] = $this->Course();
        $data["lessons"] = LessonResource::collection($this->Lessons($request->lesson_search)->get());
        if (isset($request->userId)) {
            $data["averagePercentage"] = $this->GetPercentage($request->userId);
        }
        return $data;
    }
}
