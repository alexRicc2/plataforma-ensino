<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Group extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";

    protected $fillable = [
        "name",
        "description"
    ];

    public function UserGroups() {
        return $this->hasMany(UserGroup::class, "group_id", "id");
    }

    public function CourseGroups() {
        return $this->hasMany(CourseGroup::class, "group_id", "id");
    }
    
    public function AutomaticGroups() {
        return $this->hasMany(AutomaticGeneratedCourseGroup::class, "group_id", "id");
    }

    public function Users() {
        $usersIds = $this->UserGroups()->pluck("user_id");
        return User::whereIn("id", $usersIds);
    }

    public function Courses() {
        $coursesIds = $this->CourseGroups()->pluck("course_id");
        return CourseMain::whereIn("id", $coursesIds);
    }


    /**
     * function to get users that are not inserted in this group
     */
    public function OutsideUsers() {
        $usersIds = $this->UserGroups()->pluck("user_id");
        return User::whereNotIn("id", $usersIds);
    }

}
