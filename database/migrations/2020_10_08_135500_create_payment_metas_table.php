<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentMetasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payment_metas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('balance_id')->unique()->constrained()->onDelete('cascade');
            $table->decimal('guests')->nullable();
            $table->decimal('amount');
            $table->string('currency_code');
            $table->string('service');
            $table->json('datas')->nullable();
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
        Schema::dropIfExists('payment_metas');
    }
}
