<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesCategoryRelationTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses_category_relation', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("course_id")->references("id")->on("courses_main")->onDelete("cascade");
            $table->foreignUuid("category_id")->references("id")->on("courses_category")->onDelete("cascade");
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
        Schema::dropIfExists('courses_category_relation');
    }
}
