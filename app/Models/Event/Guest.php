<?php

namespace App\Models\Event;

use Illuminate\Database\Eloquent\Model;

class Guest extends Model
{
    /**
     * @var string
     */
    protected $table = 'guests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'phone', 'code', 'autorized', 'template_id', 'sms_total', 
        'text_sms', 'text_whatsapp', 'can_send_sms', 'can_send_whatsapp', 
        'can_include_qrcode'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function consumeds()
    {
        return $this->hasMany(Consumed::class);
    }
}
