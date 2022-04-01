<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Tags extends Model {
    use HasFactory, SoftDeletes, Uuid;

    protected $table = "tags";
    protected $keyType = "string";

    protected $fillable = [
        "name",
        "key"
    ];
}
