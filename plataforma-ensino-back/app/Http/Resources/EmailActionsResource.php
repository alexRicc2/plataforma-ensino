<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmailActionsResource extends JsonResource {
    public function toArray($request) {
        $data = parent::toArray($request);

        $data["user"] = $this->User()->first();
        $data["email"] = $this->Email()->first();

        return $data;
    }
}
