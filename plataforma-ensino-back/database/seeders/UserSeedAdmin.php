<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeedAdmin extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user=User::where('email','=','admin@admin.com')->first();
        $user->fill([
            'name'=>'Administrator',
            'email'=>'admin@admin.com',
            'password'=>bcrypt('12345678')
        ])->save();
        $user=new User();
        $user->fill([
            'name'=>'Administrator ItecMais',
            'email'=>'admin@itecmais.com.br',
            'password'=>bcrypt('12345678')
        ])->save();
    }
}
