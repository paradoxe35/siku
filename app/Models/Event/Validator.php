<?php

namespace App\Models\Event;

use App\Infrastructure\Prices;
use App\Infrastructure\ProductPrice;
use App\User;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Instasent\SMSCounter\SMSCounter;

class Validator extends Authenticatable
{
    use HasApiTokens;

    /**
     * @var string
     */
    protected $table = 'validators';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'username', 'phone', 'country_code', 'country_call', 'user_id', 'sended_sms'
    ];

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
    public function getSendedSmsAttribute($value)
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
     * @return string
     */
    public function messageText()
    {
        $text = "Hello {$this->name},\nYou has been set as a siku validator.\nYour username access: {$this->username}\n";
        return $text;
    }

    /**
     * get service prices
     * 
     * @return double|null
     */
    protected function productPrices(string $key)
    {
        /** @var ProductPrice */
        $productClass = resolve(ProductPrice::class);
        $prices = $productClass->getPrice($this->country_code);

        return $prices[$key];
    }

    /**
     * @return double
     */
    public function priceSms()
    {
        $sms = $this->productPrices('sms');
        $counter = (new SMSCounter)->count($this->messageText());
        $price = !is_null($sms) ? ($sms * $counter->messages) : 0;

        $isValid = Prices::validatePrice($this->user, $price, 'sms');

        if (!$isValid || !($price > 0)) {
            return null;
        }

        return $price;
    }
}
