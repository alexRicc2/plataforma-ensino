<?php

namespace Database\Seeders;

use App\Models\Curso;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;

class UserSeed extends Seeder {

    public function run() {
        $role = UserRole::firstOrNew(["key" => "aluno"]);
        $role->fill([
            "name" => "Aluno",
            "key" => "aluno"
        ])->save();

        $role = UserRole::firstOrNew(["key" => "professor"]);
        $role->fill([
            "name" => "Professor",
            "key" => "professor"
        ])->save();

        $role = UserRole::firstOrNew(["key" => "colaborador"]);
        $role->fill([
            "name" => "Colaborador",
            "key" => "colaborador"
        ])->save();

        $role = UserRole::firstOrNew(["key" => "admin"]);
        $role->fill([
            "name" => "Admin",
            "key" => "admin"
        ])->save();

        $user = User::firstOrNew(["email" => "admin@admin.com"]);
        $user->fill([
            'name' => 'Administrator',
            'email' => 'admin@admin.com',
            'password' => bcrypt('12345678'),
            'role_id' => $role->id
        ])->save();
    }
}
