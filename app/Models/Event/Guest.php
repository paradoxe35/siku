<?php

namespace App\Models\Event;

use App\Infrastructure\ProductPrice;
use App\Models\Balance\Consumed;
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
     * @return int
     */
    public function price()
    {
        /** @var ProductPrice */
        $productClass = resolve(ProductPrice::class);
        list($sms, $whatsapp) = $productClass->getPrice($this->country_code);
        $total = 0;

        if ($this->can_send_sms) {
            $total += !is_null($sms) ? ($sms * $this->sms_total) : 0;
        }

        if ($this->can_send_whatsapp) {
            $total += !is_null($whatsapp) ? $whatsapp : 0;
        }

        return $total;
    }

    /**
     * @return int
     */
    public function whatsappPrice()
    {
        /** @var ProductPrice */
        $productClass = resolve(ProductPrice::class);
        $whatsapp = $productClass->getPrice($this->country_code)['whatsapp'];
        return !is_null($whatsapp) ? $whatsapp : 0;
    }

    /**
     * @return int
     */
    public function smsPrice()
    {
        /** @var ProductPrice */
        $productClass = resolve(ProductPrice::class);
        $sms = $productClass->getPrice($this->country_code)['sms'];
        return !is_null($sms) ? ($sms * $this->sms_total) : 0;
    }

    /**
     * @return int|null
     */
    public function validateWhatsappPrice()
    {
        /** @var \App\User */
        $user = $this->user;
        $balance = $user->balance();
        $price = $this->whatsappPrice();

        if ($balance < $price) {
            return null;
        }

        return $price;
    }

    /**
     * @return int|null
     */
    public function validateSmsPrice()
    {
        /** @var \App\User */
        $user = $this->user;
        $balance = $user->balance();
        $price = $this->smsPrice();

        if ($balance < $price) {
            return null;
        }

        return $price;
    }

    /**
     * @return int|null
     */
    public function validatePrice()
    {
        /** @var \App\User */
        $user = $this->user;
        $balance = $user->balance();
        $price = $this->price();

        if ($balance < $price) {
            return null;
        }

        return $price;
    }

    /**
     * @return bool
     */
    public function sendedSms()
    {
        $h = $this->historical;
        return $h && $h->sended_sms;
    }

    /**
     * @return bool
     */
    public function sendedWhatsapp()
    {
        $h = $this->historical;
        return $h && $h->sended_whatsapp;
    }

    /**
     * @return bool
     */
    public function sended()
    {
        $h = $this->historical;

        $sended_sms = $this->can_send_sms ? ($h ? $h->sended_sms : false) : true;

        $sended_whatsapp = $this->can_send_whatsapp ? ($h ? $h->sended_whatsapp : false) : true;

        return ($sended_sms && $sended_whatsapp && ($h && !$h->error));
    }

    /**
     * @return bool
     */
    public function unsended()
    {
        $h = $this->historical;

        $sended_sms = $this->can_send_sms && ($h ? !$h->sended_sms : true);

        $sended_whatsapp = $this->can_send_whatsapp && ($h ? !$h->sended_whatsapp : true);

        return (($h && $h->error) || $sended_sms || $sended_whatsapp);
    }

    /**
     * @return bool
     */
    public function inWait()
    {
        return !$this->historical;
    }


    /**
     * @return bool
     */
    public function failed()
    {
        $h = $this->historical;
        return $h && $h->error;
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function attend()
    {
        return $this->hasOne(Attend::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function consumeds()
    {
        return $this->hasMany(Consumed::class);
    }
}
