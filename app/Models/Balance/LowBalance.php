<?php

namespace App\Models\Balance;

use App\User;
use Illuminate\Database\Eloquent\Model;

class LowBalance extends Model
{
    /**
     * @var string
     */
    protected $table = 'low_balances';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['amount'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
