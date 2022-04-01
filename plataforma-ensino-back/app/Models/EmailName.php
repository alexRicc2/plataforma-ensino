<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class EmailName extends Model {
    use HasFactory, Uuid, SoftDeletes;

    protected $keyType = "string";
    protected $table = "emailname";

    protected $fillable = [
        "email",
        "name"
    ];

    public function HasActiveAccount() {
        return User::where("email", $this->email)->exists();
    }

}
