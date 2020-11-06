<?php

namespace App\Models\Balance;

use App\Http\Resources\User;
use App\Models\Payments\CustomPayment;
use App\Models\Event\Event;
use App\Models\Payments\PaymentMeta;
use Illuminate\Database\Eloquent\Model;
use Vinkla\Hashids\Facades\Hashids;

class Balance extends Model
{
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
     * @return string
     */
    public function hashId()
    {
        /** @var  mixed */
        $h = new Hashids;
        return $h::encode($this->id);
    }

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
