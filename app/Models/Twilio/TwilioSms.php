<?php

namespace App\Models\Twilio;

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
}
