<?php

namespace App\Models\Twilio;

use App\Models\Balance\Consumed;
use App\Models\Event\Guest;
use App\User;
use Illuminate\Database\Eloquent\Model;

class TwilioSms extends Model
{

    /**
     * @var string
     */
    protected $table = 'twilio_sms';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'sid', 'status', 'token', 'data',
        'price', 'unit_price', 'guest_id', 'user_id',
        'consumed', 'consumed_id'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function consumed()
    {
        $this->belongsTo(Consumed::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function guest()
    {
        $this->belongsTo(Guest::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        $this->belongsTo(User::class);
    }
}
