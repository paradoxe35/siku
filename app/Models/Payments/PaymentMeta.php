<?php

namespace App\Models\Payments;

use App\Models\Balance\Balance;
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function balance()
    {
        return $this->belongsTo(Balance::class);
    }
}
