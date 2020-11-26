<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTwilioSmsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('twilio_sms', function (Blueprint $table) {
            $table->id();
            $table->string('sid');
            $table->string('status');
            $table->string('token');
            $table->json('data')->nullable();
            $table->double('price')->nullable();
            $table->double('unit_price')->nullable();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('guest_id')->nullable()->constrained()->onDelete('set null');
            $table->foreignId('consumed_id')->nullable()->constrained()->onDelete('set null');
            $table->boolean('consumed')->default(false);
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
        Schema::dropIfExists('twilio_sms');
    }
}
