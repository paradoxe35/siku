<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRenameWhatsappToGuestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('guests', function (Blueprint $table) {
            $table->renameColumn('text_whatsapp', 'text_mail');
            $table->renameColumn('can_send_whatsapp', 'can_send_mail');
            $table->renameColumn('text_whatsapp_hidden_code', 'text_mail_hidden_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('guests', function (Blueprint $table) {
            $table->renameColumn('text_mail', 'text_whatsapp');
            $table->renameColumn('can_send_mail', 'can_send_whatsapp');
            $table->renameColumn('text_mail_hidden_code', 'text_whatsapp_hidden_code');
        });
    }
}
