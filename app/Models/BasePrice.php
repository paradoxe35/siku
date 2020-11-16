<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BasePrice extends Model
{
    /**
     * @var string
     */
    protected $table = 'base_prices';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['amount_sms', 'amount_mail'];
}
