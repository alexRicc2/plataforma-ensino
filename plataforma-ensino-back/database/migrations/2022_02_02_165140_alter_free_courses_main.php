<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterFreeCoursesMain extends Migration {
    public function up() {
        Schema::table('courses_main', function (Blueprint $table) {
            $table->boolean("free")->default(false);
            $table->float("price")->default(0.0);
            $table->text("course_content")->nullable();
            $table->text("what_will_learn")->nullable();
            $table->string("cover_image")->nullable();
        });
    }

    public function down() {
        //
    }
}
