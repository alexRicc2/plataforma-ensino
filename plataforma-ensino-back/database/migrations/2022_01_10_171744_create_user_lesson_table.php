<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserLessonTable extends Migration {
    public function up() {
        Schema::create('user_lesson', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreignUuid("lesson_id")->references("id")->on("lessons")->onDelete("cascade");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('user_lesson');
    }
}
