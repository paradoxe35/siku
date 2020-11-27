<?php

namespace App\Models\Event;

use App\User;
use Illuminate\Database\Eloquent\Model;

class SendHistorical extends Model
{
    /**
     * @var string
     */
    protected $table = 'send_historicals';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id', 'event_id', 'guest_id',
        'consumeds', 'sended_sms', 'sended_mail', 'retry', 'error', 'error_message'
    ];


    /**
     * @param mixed $value
     * 
     * @return bool 
     */
    public function getSendedSmsAttribute($value)
    {
        return boolval($value);
    }

    /**
     * @param mixed $value
     * 
     * @return bool 
     */
    public function getSendedMailAttribute($value)
    {
        return boolval($value);
    }

    /**
     * @param mixed $value
     * 
     * @return bool 
     */
    public function getErrorAttribute($value)
    {
        return boolval($value);
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
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function guest()
    {
        return $this->belongsTo(Guest::class);
    }
}
