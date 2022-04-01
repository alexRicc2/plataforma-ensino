<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserListCourse extends Model {
    use HasFactory, SoftDeletes, Uuid;

    protected $keyType = "string";
    protected $table = "user_list_course";

    protected $fillable = [
        "course_id",
        "user_id"
    ];

    public function Course() {
        return $this->hasOne(CourseMain::class, "id", "course_id");
    }

}
