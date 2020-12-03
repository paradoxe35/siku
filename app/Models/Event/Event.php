<?php

namespace App\Models\Event;

use App\Infrastructure\Cache\CacheJobEvent;
use App\Infrastructure\ProductPrice;
use App\Models\Balance\Balance;
use App\Models\Balance\Consumed;
use App\Models\Payments\CustomPayment;
use App\Models\Template\Template;
use App\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;
use Illuminate\Database\Eloquent\SoftDeletes;

class Event extends Model
{
    use HasHashid, HashidRouting, CacheJobEvent, SoftDeletes;

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
        'name', 'event_date', 'hashid',
        'short_id',
        'desciption',
        'is_public',
        'active',
        'qrcode_logo',
        'start_time',
        'end_time'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array
     */
    protected $casts = [
        'event_date' => 'datetime',
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    /**
     * Get the event name
     *
     * @param  string  $value
     * @return string
     */
    public function getNameAttribute($value)
    {
        return Str::title($value);
    }

    /**
     * Get the event status
     *
     * @param  int  $value
     * @return bool
     */
    public function getIsPublicAttribute($value)
    {
        return boolval($value);
    }

    /**
     * Qr code image path
     *
     * @return string
     */
    public function getQrCodePathAttribute()
    {
        return asset($this->qrcode_logo ?: 'img/mail.png');
    }


    /**
     * Get the event status
     *
     * @param  int  $value
     * @return bool
     */
    public function getActiveAttribute($value)
    {
        return boolval($value);
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
    public function presumedPrice($country_code, $showPrice)
    {
        $guest = $this->eventGuests->sum('guest');
        if ($showPrice) {
            /** @var  ProductPrice */
            $productClass = resolve(ProductPrice::class);
            $prices = $productClass->getPrice($country_code);
        }
        return [
            'prices' => $prices ?? 0,
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
        $total = $this->totalBalance();
        $consumed = $this->totalConsumeds();
        return round(($total - $consumed), 2);
    }

    /**
     * @return bool
     */
    public function InQueueProcess()
    {
        return $this->hasEventProcess($this->id);
    }

    /**
     * @return array|null
     */
    public function InQueueProcessData()
    {
        return $this->getEventProcess($this->id);
    }


    /**
     * @return \Illuminate\Support\Collection
     */
    public function processedGuests()
    {
        /**
         * @var  \Illuminate\Support\Collection
         */
        $guests = $this->guests()->get();

        return $guests->filter(fn (Guest $guest) => $guest->sended());
    }

    /**
     * @return \Illuminate\Support\Collection
     */
    public function unprocessedGuests($group = false)
    {
        /**
         * @var  \Illuminate\Support\Collection
         */
        $guests = $this->guests()->get();

        $unprocessed = $guests->filter(fn (Guest $guest) => $guest->unsended());

        $grouped = [];
        if ($group) {
            $grouped['wait'] = $unprocessed->filter(fn (Guest $guest) => $guest->inWait());

            $grouped['fail'] =  $unprocessed->filter(fn (Guest $guest) => $guest->failed());
        }

        return !$group ? $unprocessed : (object) $grouped;
    }

    /**
     * @param Event $event
     */
    public function status()
    {
        return [
            'processed' => $this->processedGuests()->count(),
            'total' => $this->guests()->count(),
            'consumed' => round($this->totalConsumeds(), 2)
        ];
    }

    /**
     * @return int
     */
    public function totalConsumeds()
    {
        return $this->consumeds()->where('confirmed', true)->sum('amount');
    }

    /**
     * @return int
     */
    public function invitationSent()
    {
        return $this->consumeds()->where('confirmed', true)->count();
    }

    /**
     * @return int
     */
    public function totalBalance()
    {
        return $this->AllBalance()->where('confirmed', true)->sum('amount');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function templates()
    {
        return $this->hasMany(Template::class);
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

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function validators()
    {
        return $this->hasMany(Validator::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function attends()
    {
        return $this->hasMany(Attend::class);
    }
}
