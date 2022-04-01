<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailnameTable extends Migration {
    public function up() {
        Schema::create('emailname', function (Blueprint $table) {
            $table->string('email');
            $table->string('name');
            $table->uuid('id')->primary();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('emailname');
    }
}
