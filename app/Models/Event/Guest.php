<?php

namespace App\Models\Event;

use App\Models\Template\Template;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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
        'can_include_qrcode', 'country_code', 'country_call', 'user_id',
        'text_sms_hidden_code', 'text_whatsapp_hidden_code'
    ];

    /**
     * Get the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getNameAttribute($value)
    {
        return ucwords(Str::lower($value));
    }

    /**
     * @param mixed $value
     * 
     * @return bool 
     */
    public function getCanSendSmsAttribute($value)
    {
        return boolval($value);
    }


    /**
     * @return bool
     */
    public function sendedSms()
    {
        $h = $this->historical;
        return $h && !$h->error && $h->sended_sms;
    }

    /**
     * @return bool
     */
    public function sendedWhatsapp()
    {
        $h = $this->historical;
        return $h && !$h->error && $h->sended_whatsapp;
    }

    /**
     * @return array
     */
    public function services()
    {
        $arr = [];
        if ($this->can_send_sms) {
            $arr[] = 'SMS';
        }

        if ($this->can_send_whatsapp) {
            $arr[] = 'WhatsApp';
        }

        return $arr;
    }

    /**
     * @param mixed $value
     * 
     * @return bool 
     */
    public function getCanSendWhatsappAttribute($value)
    {
        return boolval($value);
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function historical()
    {
        return $this->hasOne(SendHistorical::class);
    }
}
