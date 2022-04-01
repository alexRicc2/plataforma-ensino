<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class UserCourse extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";
    protected $table = "user_course";

    protected $fillable = [
        "course_id",
        "user_id"
    ];

    public function User() {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function Course() {
        return $this->belongsTo(CourseMain::class, "course_id", "id");
    }

    public function Lessons() {
        $course = $this->Course()->first();
        return $course->Lessons();
    }

    public function Files() {
        $lessons = $this->Lessons()->get();
        $filesIds = [];
        foreach ($lessons as $lesson) {
            $files = $lesson->LessonFiles()->get();
            foreach ($files as $file) {
                $filesIds[] = $file->id;
            }
        }
        
        return LessonFiles::whereIn("id", $filesIds);
    }

    public function LastSeenLesson() {
        $filesIds = $this->Files()->pluck("id");
        Log::info($filesIds);
        Log::info(UserFile::where("user_id", "=", $this->user_id)->whereIn("file_id", $filesIds)->orderBy("updated_at", "DESC")->first());
        return UserFile::where("user_id", "=", $this->user_id)->whereIn("file_id", $filesIds)->orderBy("updated_at", "DESC");
    }

}
