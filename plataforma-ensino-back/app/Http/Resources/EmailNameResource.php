<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmailNameResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);

        $data["hasActiveAccount"] = $this->HasActiveAccount();

        return $data;
    }
}
