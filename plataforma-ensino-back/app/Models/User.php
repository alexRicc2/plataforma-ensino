<?php

namespace App\Models;

use GoldSpecDigital\LaravelEloquentUUID\Database\Eloquent\Uuid;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable {
    use HasApiTokens, HasFactory, Notifiable, Uuid;

    protected $keyType = "string";

    protected $fillable = [
        'name',
        'email',
        'phone',
        'profile_image',
        'password',
        'role_id',
        'signature'
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function Role() {
        return $this->belongsTo(UserRole::class, "role_id", "id");
    }

    public function UserGroups() {
        return $this->hasMany(UserGroup::class, "user_id", "id");
    }

    public function IsAdmin() {
        return $this->Role()->first()->key == "admin";
    }

}
