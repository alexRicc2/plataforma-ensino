<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseEvaluationsTable extends Migration {
    public function up() {
        Schema::create('course_evaluations', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreignUuid("course_id")->references("id")->on("courses_main")->onDelete("cascade");
            $table->text("comment");
            $table->float("points")->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('course_evaluations');
    }
}
