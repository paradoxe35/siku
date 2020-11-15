<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRenameAndFieldsToBasePricesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('base_prices', function (Blueprint $table) {
            $table->renameColumn('amount', 'amount_sms');
            $table->decimal('amount_mail')->default(0.02);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('base_prices', function (Blueprint $table) {
            $table->renameColumn('amount_sms', 'amount');
            $table->dropColumn('amount_mail');
        });
    }
}
