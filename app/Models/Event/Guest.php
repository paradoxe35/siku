<?php

namespace App\Models\Event;

use App\Models\Template\Template;
use App\User;
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
        'can_include_qrcode', 'country_code', 'country_call', 'user_id'
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function template()
    {
        return $this->belongsTo(Template::class);
    }
}
