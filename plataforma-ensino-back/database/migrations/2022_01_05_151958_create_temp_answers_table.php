<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTempAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_answers', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("exercise_id")->references("id")->on("exercise")->onDelete("cascade");
            $table->foreignUuid("alternative_id")->references("id")->on("alternative")->onDelete("cascade");
            $table->foreignUuid("user_id")->references("id")->on("users")->onDelete("cascade");
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
        Schema::dropIfExists('temp_answers');
    }
}
