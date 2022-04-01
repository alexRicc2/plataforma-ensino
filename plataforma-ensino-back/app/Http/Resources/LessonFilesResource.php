<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class LessonFilesResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);

        $data["userfile"] = $this->UserFiles()->where("user_id", "=", isset($request->userId) ? $request->userId : Auth::id())->first();

        return $data;
    }
}
