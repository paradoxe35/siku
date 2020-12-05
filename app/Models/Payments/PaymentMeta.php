<?php

namespace App\Models\Payments;

use App\Casts\DateTimeTz;
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
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'created_at' => DateTimeTz::class
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function balance()
    {
        return $this->belongsTo(Balance::class);
    }
}
