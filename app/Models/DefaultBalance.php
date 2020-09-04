<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DefaultBalance extends Model
{
    /**
     * @var string
     */
    protected $table = 'default_balances';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['balance', 'active'];
}
