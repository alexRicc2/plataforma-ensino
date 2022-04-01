<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class CoursesCategory extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";
    protected $table = "courses_category";

    protected $fillable = [
        "name",
        "key"
    ];

    public function Courses() {
        $ids = $this->hasMany(CoursesCategoryRelation::class, "category_id", "id")->pluck("course_id");
        return CourseMain::whereIn("id", $ids);
    }
}
