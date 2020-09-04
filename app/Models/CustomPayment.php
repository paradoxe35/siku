<?php

namespace App\Models;

use App\Http\Resources\User;
use App\Models\Event\Event;
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
        'amount', 'payment_code', 'active'
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
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
