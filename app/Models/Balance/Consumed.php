<?php

namespace App\Models\Balance;

use App\Http\Resources\User;
use App\Models\Event\Event;
use App\Models\Event\Guest;
use Illuminate\Database\Eloquent\Model;

class Consumed extends Model
{
    /**
     * @var string
     */
    protected $table = 'consumeds';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['amount', 'service', 'confirmed', 'user_id', 'event_id'];

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
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
