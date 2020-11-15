<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRenameWhatsappToSendHistoricalsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('send_historicals', function (Blueprint $table) {
            $table->renameColumn('sended_whatsapp', 'sended_mail');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('send_historicals', function (Blueprint $table) {
            $table->renameColumn('sended_mail', 'sended_whatsapp');
        });
    }
}
