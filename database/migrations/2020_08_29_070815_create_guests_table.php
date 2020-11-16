<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGuestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('guests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('name');
            $table->string('phone');
            $table->string('code');
            $table->integer('autorized')->default(1);
            $table->integer('sms_total')->nullable();
            $table->longText('text_sms')->nullable();
            $table->longText('text_whatsapp')->nullable();
            $table->boolean('can_send_sms')->default(true);
            $table->boolean('can_send_whatsapp')->default(true);
            $table->boolean('can_include_qrcode')->default(true);
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
        Schema::dropIfExists('guests');
    }
}
