<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLessonModuleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lesson_module', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("lesson_id")->references("id")->on("lessons")->onDelete("cascade");
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
        Schema::dropIfExists('lesson_module');
    }
}
