<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailActions extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";

    protected $fillable = [
        "email_id",
        "user_id",
        "general_description",
        "action_description"
    ];

    public function User() {
        return $this->belongsTo(User::class, "user_id", "id");
    }

    public function Email() {
        return $this->belongsTo(EmailName::class, "email_id", "id");
    }

}
