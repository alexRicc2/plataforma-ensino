<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseModule extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "course_module";
    protected $keyType = "string";

    protected $fillable = [
        "course_id",
        "module_id"
    ];
}
