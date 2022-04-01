<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CoursesResponsibles extends Model {
    use HasFactory, SoftDeletes, Uuid;

    protected $table = "table_courses_responsibles";
    protected $keyType = "string";

    protected $fillable = [
        "user_id",
        "course_id"
    ];

}
