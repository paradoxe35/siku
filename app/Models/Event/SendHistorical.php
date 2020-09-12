<?php

namespace App\Models\Event;

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
        'user_id', 'guest_id', 'consumeds', 'sended_sms', 'sended_whatsapp', 'retry', 'error', 'error_message'
    ];

}
