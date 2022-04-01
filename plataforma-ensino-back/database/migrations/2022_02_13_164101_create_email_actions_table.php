<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmailActionsTable extends Migration {
    public function up() {
        Schema::create('email_actions', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("email_id")->references("id")->on("emailname")->onDelete("cascade");
            $table->foreignUuid("user_id")->nullable()->references("id")->on("users")->onDelete("cascade");
            $table->text("general_description")->default("");
            $table->text("action_description")->default("");
            $table->softDeletes();
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('email_actions');
    }
}
