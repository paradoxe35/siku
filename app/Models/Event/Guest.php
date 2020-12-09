<?php

namespace App\Models\Event;

use App\Infrastructure\Prices;
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
        'name', 'phone', 'email', 'code', 'autorized', 'template_id', 'sms_total',
        'text_sms', 'text_mail', 'can_send_sms', 'can_send_mail',
        'can_include_qrcode', 'country_code', 'country_call', 'user_id',
        'text_sms_hidden_code', 'text_mail_hidden_code', 'common_guest_id', 'can_include_icalendar'
    ];

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'autorized' => '1',
    ];

    /**
     * @var string
     */
    protected $servicesPrices = null;


    /**
     * Get the user's first name.
     *
     * @param  string  $value
     * @return string
     */
    public function getNameAttribute($value)
    {
        return Str::title($value);
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
    public function canSendSms()
    {
        return $this->can_send_sms && $this->phone;
    }

    /**
     * @return bool 
     */
    public function canSendMail()
    {
        return $this->can_send_mail && $this->email;
    }

    /**
     * @return int
     */
    public function price()
    {
        $total = 0;

        if ($this->canSendSms()) {
            $total += $this->smsPrice('sms');
        }

        if ($this->canSendMail()) {
            $total += $this->mailPrice('mail');;
        }

        return $total;
    }

    /**
     * get service prices
     * 
     * @return double|null
     */
    protected function productPrices(string $key)
    {
        $mail = null;

        if (!is_null($this->servicesPrices)) {
            $mail = $this->servicesPrices[$key];
        } else {
            /** @var ProductPrice */
            $productClass = resolve(ProductPrice::class);
            $prices = $productClass->getPrice($this->country_code);
            $this->servicesPrices = $prices;

            $mail = $prices[$key];
        }

        return $mail;
    }

    /**
     * @return int
     */
    public function mailPrice()
    {
        $mail = $this->productPrices('mail');

        return !is_null($mail) ? $mail : 0;
    }

    /**
     * @return int
     */
    public function smsPrice()
    {
        $sms = $this->productPrices('sms');

        return !is_null($sms) ? ($sms * $this->sms_total) : 0;
    }

    /**
     * @return int|null
     */
    public function validateMailPrice()
    {
        $price = $this->mailPrice();
        $isValid = Prices::validatePrice($this->user, $price, 'mail');

        if (!$isValid) {
            return null;
        }

        return $price;
    }

    /**
     * @return int|null
     */
    public function validateSmsPrice()
    {
        $price = $this->smsPrice();
        $isValid = Prices::validatePrice($this->user, $price, 'sms');

        if (!$isValid || !($price > 0)) {
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
    public function sendedMail()
    {
        $h = $this->historical;
        return $h && $h->sended_mail;
    }

    /**
     * @return bool
     */
    public function sended()
    {
        $h = $this->historical;

        $sended_sms = $this->canSendSms() ? ($h ? $h->sended_sms : false) : true;

        $sended_mail = $this->canSendMail() ? ($h ? $h->sended_mail : false) : true;

        return ($sended_sms && $sended_mail && ($h && !$h->error));
    }

    /**
     * @return bool
     */
    public function unsended()
    {
        $h = $this->historical;

        $sended_sms = $this->canSendSms() && ($h ? !$h->sended_sms : true);

        $sended_mail = $this->canSendMail() && ($h ? !$h->sended_mail : true);

        return (($h && $h->error) || $sended_sms || $sended_mail);
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
        if ($this->canSendSms()) {
            $arr[] = 'SMS';
        }

        if ($this->canSendMail()) {
            $arr[] = 'Mail';
        }

        return $arr;
    }

    /**
     * @param mixed $value
     * 
     * @return bool 
     */
    public function getCanSendMailAttribute($value)
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
