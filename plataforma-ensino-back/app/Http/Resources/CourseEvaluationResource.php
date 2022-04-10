<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseEvaluationResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);
        $data["user"] = $this->User()->first();
        return $data;
    }
}
