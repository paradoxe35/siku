<?php

namespace App\Models\Balance;

use App\Infrastructure\BasePrice;
use App\Models\Payments\CustomPayment;
use App\Models\Event\Event;
use App\Models\Payments\PaymentMeta;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Mtvs\EloquentHashids\HasHashid;

class Balance extends Model
{
    use HasHashid;

    /**
     * @var string
     */
    protected $table = 'balances';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'token', 'confirmed', 'amount', 'custom_payment_id', 'event_id', 'guests'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return double
     */
    public function revenue()
    {
        $base = BasePrice::getAmount();

        return $this->amount - ($base * $this->guests);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customPayment()
    {
        return $this->hasMany(CustomPayment::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function paymentMeta()
    {
        return $this->hasOne(PaymentMeta::class);
    }
}
