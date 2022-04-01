<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CourseTags extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "course_tags";
    protected $keyType = "string";

    protected $fillable = [
        "tag_id",
        "course_id"
    ];
}
