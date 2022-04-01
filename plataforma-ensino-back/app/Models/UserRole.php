<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class UserRole extends Model {
    use HasFactory, Uuid;

    protected $keyType = "string";
    protected $table = "user_role";

    protected $fillable = [
        "name",
        "key"
    ];

}
