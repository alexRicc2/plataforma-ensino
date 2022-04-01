<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCourseModuleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('course_module', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("course_id")->references("id")->on("courses_main")->onDelete("cascade");
            $table->foreignUuid("module_id")->references("id")->on("module")->onDelete("cascade");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('course_module');
    }
}
