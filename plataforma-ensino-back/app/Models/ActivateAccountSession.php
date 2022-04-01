<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ActivateAccountSession extends Model {
    use HasFactory, Uuid;

    protected $keyType = "string";

    protected $fillable = [
        "emailname_id"
    ];

}
