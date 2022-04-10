<?php

namespace App\Models;

use App\Http\Resources\ModuleResource;
use App\Http\Resources\UserResource;
use Carbon\Carbon;
use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Log;

class CourseMain extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";
    protected $table = "courses_main";

    protected $fillable = [
        "name",
        "description",
        "course_content",
        "what_will_learn",
        "image",
        "created_by",
        "price",
        "free",
        "cover_image",
        "video_trailer"
    ];

    public function Categories() {
        $ids = $this->hasMany(CoursesCategoryRelation::class, "course_id", "id")->pluck("category_id");
        return CoursesCategory::whereIn("id", $ids);
    }

    public function Tags() {
        $ids = $this->hasMany(CourseTags::class, "course_id", "id")->pluck("tag_id");
        return Tags::whereIn("id", $ids);
    }

    public function Responsibles() {
        $ids = $this->hasMany(CoursesResponsibles::class, "course_id", "id")->pluck("user_id");
        return UserResource::collection(User::whereIn("id", $ids)->get());
    }

    public function Modules($search = "") {
        $ids = $this->hasMany(CourseModule::class, "course_id", "id")->pluck("module_id");
        return ModuleResource::collection(Module::whereIn("id", $ids)->where("name", "ilike", $search . "%")->orderBy("created_at")->get());
    }

    public function Groups() {
        $groupsIds = $this->hasMany(CourseGroup::class, "course_id", "id")->pluck("group_id");
        return Group::whereIn("id", $groupsIds);
    }

    public function UserCourse() {
        return $this->hasMany(UserCourse::class, "course_id", "id");
    }

    public function UserListCourse() {
        return $this->hasMany(UserListCourse::class, "course_id", "id");
    }

    public function AutomaticGroups() {
        return $this->hasMany(AutomaticGeneratedCourseGroup::class, "course_id", "id");
    }

    public function Rate() {
        return $this->hasMany(CourseEvaluation::class, "course_id", "id");
    }

    public function Duration() {
        $files = $this->Files()->get();
        $duration = 0;
        foreach ($files as $file) $duration += $file->duration;
        return $duration;
    }

    public function FirstLesson() {
        $modules = $this->Modules();
        foreach ($modules as $module) {
            $lessons = $module->Lessons()->get();
            if (sizeof($lessons) > 0) {
                foreach ($lessons as $lesson) {
                    $files = $lesson->Files()->files;
                    if (count($files) > 0) {
                        $firstFile = $files[0];
                        return $firstFile->id;
                    }
                }
            }
        }
        return null;
    }

    public function Lessons() {
        $modules = $this->Modules();
        $lessonsIds = [];
        foreach ($modules as $module) {
            $lessons = $module->Lessons()->get();
            foreach ($lessons as $lesson) {
                $lessonsIds[] = $lesson->id;
            }
        }
        return Lesson::whereIn("id", $lessonsIds);
    }

    public function Files() {
        $lessons = $this->Lessons()->get()->pluck("id");
        return LessonFiles::whereIn("lesson_id", $lessons);
    }

    public function GetPercentage($userId) {
        if (!$userId) return;

        $percentageSum = 0;

        $modules = $this->Modules();

        foreach ($modules as $module) {
            $percentageSum += $module->GetPercentage($userId);
        }

        if (count($modules) != 0) return (float) number_format($percentageSum / count($modules), 2);
        return 0;
    }

    public function InDateRange() {
        $now = Carbon::now();
        return $now->between($this->sub_start, $this->sub_end);
    }

    public function RateAverage() {
        $rates = $this->Rate()->get();
        $sum = 0;
        if (sizeof($rates) == 0) return 0;
        foreach ($rates as $rate) {
            $sum += $rate->points;
        }
        return $sum / sizeof($rates);
    }

}
