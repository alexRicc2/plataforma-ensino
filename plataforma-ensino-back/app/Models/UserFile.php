<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserFile extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "user_file";
    protected $keyType = "string";

    protected $fillable = [
        "user_id",
        "file_id",
        "completed",
        "video_time"
    ];

    public function User() {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function File() {
        return $this->belongsTo(LessonFiles::class, "file_id", "id");
    }

}
