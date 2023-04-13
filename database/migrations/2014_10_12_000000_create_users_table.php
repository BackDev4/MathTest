<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->integer('theme_id')->default(0);
            $table->integer('test_id')->default(0);
            $table->string('theme_title')->default("");
            $table->string('name');
            $table->string('password')->default('');
            $table->string('email')->default('');
            $table->string('role')->default('');
            $table->string('group')->default('');
            $table->json('answers')->nullable();

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
        Schema::dropIfExists('users');
    }
}
