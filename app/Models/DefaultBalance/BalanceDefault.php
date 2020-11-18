<?php

namespace App\Models\DefaultBalance;

use Illuminate\Database\Eloquent\Model;

class BalanceDefault extends Model
{
    /**
     * @var string
     */
    protected $table = 'balance_defaults';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['sms', 'mail'];
}
