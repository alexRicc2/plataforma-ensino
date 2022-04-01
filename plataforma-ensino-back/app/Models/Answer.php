<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Answer extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $table = "answer";
    protected $keyType = "string";

    protected $fillable = [
        "exercise_id",
        "alternative_id",
        "user_id"
    ];

    public function Exercise() {
        return $this->belongsTo(Exercise::class, "exercise_id", "id");
    }

    public function Lesson() {
        $exercise = $this->Exercise()->first();
        return Lesson::where("id", "=", $exercise->lesson_id);
    }

    public function Alternative() {
        $alternative = $this->hasOne(Alternative::class, "id", "alternative_id")->first();
        if (!$this->Lesson()->first()->allow_answer_reveal) unset($alternative["correct"]);
        return $alternative;
    }

    public function IsCorrect() {
        $alternative = $this->Alternative();
        if ($alternative != null) return $alternative->correct;
        return false;
    }

}
