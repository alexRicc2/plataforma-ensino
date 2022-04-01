<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTableCoursesResponsiblesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('table_courses_responsibles', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("user_id")->references("id")->on("users")->onDelete("cascade");
            $table->foreignUuid("course_id")->references("id")->on("courses_main")->onDelete("cascade");
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
        Schema::dropIfExists('table_courses_responsibles');
    }
}
