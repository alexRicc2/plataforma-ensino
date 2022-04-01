<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserFileTable extends Migration {
    public function up() {
        Schema::create('user_file', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreignUuid("file_id")->references("id")->on("lesson_files")->onDelete("cascade");
            $table->boolean("completed")->default(false);
            $table->float("video_time")->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('user_file');
    }
}
