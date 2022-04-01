<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class LessonModule extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "lesson_module";
    protected $keyType = "string";

    protected $fillable = [
        "lesson_id",
        "module_id"
    ];
}
