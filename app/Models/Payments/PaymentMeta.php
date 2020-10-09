<?php

namespace App\Models\Payments;

use Illuminate\Database\Eloquent\Model;

class PaymentMeta extends Model
{
    /**
     * @var string
     */
    protected $table = 'payment_metas';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'guests',
        'amount',
        'currency_code',
        'service',
        'datas'
    ];
}
