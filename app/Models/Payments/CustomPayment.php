<?php

namespace App\Models\Payments;

use App\Models\Balance\Balance;
use App\Models\Event\Event;
use App\User;
use Illuminate\Database\Eloquent\Model;

class CustomPayment extends Model
{
    /**
     * @var string
     */
    protected $table = 'custom_payments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'amount', 'payment_code', 'active', 'guests'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function balance()
    {
        return $this->hasOne(Balance::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
