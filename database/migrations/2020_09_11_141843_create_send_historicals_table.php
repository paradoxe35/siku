<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSendHistoricalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('send_historicals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('cascade');
            $table->foreignId('guest_id')->nullable()->constrained()->onDelete('cascade');
            
            $table->double('consumeds')->default(0.00);
    
            $table->boolean('sended_sms')->default(false);
            $table->boolean('sended_whatsapp')->default(false);

            $table->integer('retry')->default(0);
            $table->boolean('error')->default(false);
            $table->longText('error_message')->nullable();
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
        Schema::dropIfExists('send_historicals');
    }
}
