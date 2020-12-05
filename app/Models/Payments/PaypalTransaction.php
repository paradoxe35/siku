<?php

namespace App\Models\Payments;

use App\User;
use Illuminate\Database\Eloquent\Model;

class PaypalTransaction extends Model
{
    /**
     * @var string
     */
    protected $table = 'paypal_transactions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'transaction_id', 'completed'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
