<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseEvaluation extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";

    protected $fillable = [
        "user_id",
        "course_id",
        "comment",
        "points"
    ];

    public function User() {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function Course() {
        return $this->belongsTo(CourseMain::class, "course_id", "id");
    }

}
