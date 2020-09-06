<?php

namespace App\Models\Event;

use App\Infrastructure\ProductPrice;
use App\Models\Balance\Balance;
use App\Models\Balance\Consumed;
use App\Models\CustomPayment;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;

class Event extends Model
{
    use HasHashid, HashidRouting;

    /**
     * @var string
     */
    protected $table = 'events';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'event_date', 'hashid', 'short_id', 'desciption', 'is_public', 'active'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'event_date' => 'datetime',
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
     * @return string
     */
    public function route()
    {
        return route('customer.event', ['event' => $this->hashid()], false);
    }

    /**
     * @return array
     */
    public function presumedPrice($country_code)
    {
        $guest = $this->eventGuests->sum('guest');
        $productClass = resolve(ProductPrice::class);
        $prices = $productClass->getPrice($country_code);
        return [
            'prices' => $prices,
            'guests' => $guest
        ];
    }
    /**
     * @return double
     */
    public function balance()
    {
        /**
         * @var double $total
         * @var double $consumed
         */
        $total = $this->totalBalance();;
        $consumed = $this->totalConsumeds();
        return round(($total - $consumed), 3);
    }

    /**
     * @return int
     */
    public function totalConsumeds() {
        return $this->consumeds()->where('confirmed', true)->sum('amount');
    }

    /**
     * @return int
     */
    public function totalBalance() {
        return $this->AllBalance()->where('confirmed', true)->sum('amount');
    }

    /**
     * @return int
     */
    public function invitationSent() {
        return $this->AllBalance()->where('confirmed', true)->count();

    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function AllBalance()
    {
        return $this->hasMany(Balance::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function consumeds()
    {
        return $this->hasMany(Consumed::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function customPayment()
    {
        return $this->hasMany(CustomPayment::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function eventGuests()
    {
        return $this->hasMany(EventGuest::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function guests()
    {
        return $this->hasMany(Guest::class);
    }
}
