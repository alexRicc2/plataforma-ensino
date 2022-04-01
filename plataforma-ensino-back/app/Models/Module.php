<?php

namespace App\Models;

use App\Http\Resources\CourseMainResource;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class Module extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "module";
    protected $keyType = "string";

    protected $fillable = [
        "name",
        "description"
    ];

    public function Course() {
        $id = $this->hasOne(CourseModule::class, "module_id", "id")->pluck("course_id");
        return CourseMain::where("id", "=", $id)->first();
    }

    public function Lessons($search = "") {
        $ids = $this->hasMany(LessonModule::class, "module_id", "id")->pluck("lesson_id");
        return Lesson::whereIn("id", $ids)->where("title", "ilike", $search . "%");
    }

    //Gets the user average percentage based of all the lessons percentages
    public function GetPercentage($userId) {
        $lessons = $this->Lessons()->get();
        $percentageSum = 0;
        $lessonsWithExerciseCount = 0;

        foreach ($lessons as $lesson) {
            if ($lesson->Exercises()->count() == 0) continue;
            $percentageSum += $lesson->GetPercentage($userId);
            $lessonsWithExerciseCount++;
        }
        if ($lessonsWithExerciseCount != 0) return (float) number_format($percentageSum / $lessonsWithExerciseCount, 2);
        else return 0;
    }

}
