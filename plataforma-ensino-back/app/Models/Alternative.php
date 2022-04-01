<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Alternative extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "alternative";
    protected $keyType = "string";

    protected $fillable = [
        "id",
        "text",
        "exercise_id",
        "correct"
    ];

    public function Exercise() {
        return $this->belongsTo(Exercise::class, "exercise_id", "id");
    }

    public function Lesson() {
        return $this->Exercise()->first()->Lesson();
    }
}
