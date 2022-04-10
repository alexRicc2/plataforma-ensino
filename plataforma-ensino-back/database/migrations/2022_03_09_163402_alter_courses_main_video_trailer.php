<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterCoursesMainVideoTrailer extends Migration {
    public function up() {
        Schema::table('courses_main', function (Blueprint $table) {
            $table->string("video_trailer")->nullable();
        });
    }

    public function down() {
        //
    }
}
