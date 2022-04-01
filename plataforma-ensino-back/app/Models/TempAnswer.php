<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TempAnswer extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "temp_answers";
    protected $keyType = "string";
    
    protected $fillable = [
        "exercise_id",
        "alternative_id",
        "user_id"
    ];

    public function Alternative() {
        return $this->hasOne(Alternative::class, "id", "alternative_id");
    }

}
