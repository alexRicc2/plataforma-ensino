<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActivateAccountSessionsTable extends Migration {
    public function up()
    {
        Schema::create('activate_account_sessions', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignUuid("emailname_id")->references("id")->on("emailname")->onDelete("cascade");
            $table->timestamps();
        });
    }

    public function down() {
        Schema::dropIfExists('activate_account_sessions');
    }
}
