<?php

namespace App;

use App\Infrastructure\Cache\CacheUserDataPay;
use App\Models\Balance\Balance;
use App\Models\Balance\Consumed;
use App\Models\Balance\LowBalance;
use App\Models\CommonGuest;
use App\Models\Payments\CustomPayment;
use App\Models\Event\Event;
use App\Models\Event\Guest;
use App\Models\Template\Template;
use App\Notifications\ResetPassword;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Support\Str;
use App\Notifications\VerifyEmail;
use Illuminate\Contracts\Auth\CanResetPassword;
use Illuminate\Auth\Passwords\CanResetPassword as PasswordTrait;
use Illuminate\Database\Eloquent\SoftDeletes;
use Mtvs\EloquentHashids\HasHashid;

class User extends Authenticatable implements MustVerifyEmail, CanResetPassword
{
    use Notifiable, HasApiTokens, PasswordTrait, CacheUserDataPay, SoftDeletes, HasHashid;

    /**
     * @var string
     */
    protected $table = 'users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'phone', 'country_name', 'country_code',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'email_verified_at',
        'updated_at', 'created_at', 'is_admin', 'admin_token', 'deleted_at',
        'super_admin'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
    ];

    /**
     * @param  int  $value
     * @return bool
     */
    public function getSuperAdminAttribute($value)
    {
        return boolval($value);
    }

    /**
     * @param  int  $value
     * @return bool
     */
    public function getIsAdminAttribute($value)
    {
        return boolval($value);
    }

    /**
     * Send the email verification notification.
     *
     * @return void
     */
    public function sendEmailVerificationNotification()
    {
        $this->notify(new VerifyEmail);
    }

    /**
     * Send the password reset notification.
     *
     * @param  string  $token
     * @return void
     */
    public function sendPasswordResetNotification($token)
    {
        $this->notify(new ResetPassword($token));
    }

    /**
     * @return bool
     */
    public function isAdmin()
    {
        return $this->is_admin === true && null !== $this->admin_token;
    }

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
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function events()
    {
        return $this->hasMany(Event::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function templates()
    {
        return $this->hasMany(Template::class);
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
        $total = $this->AllBalance()->where('confirmed', true)->sum('amount');
        $consumed = $this->consumeds()->where('confirmed', true)->sum('amount');
        return round(($total - $consumed), 2);
    }


    /**
     * @return mixed
     */
    public function payData()
    {
        return $this->getUserDataPay($this->id);
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
    public function totalBalance()
    {
        return $this->AllBalance()->where('confirmed', true)->sum('amount');
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
    public function guests()
    {
        return $this->hasMany(Guest::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function consumeds()
    {
        return $this->hasMany(Consumed::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function customPayment()
    {
        return $this->hasMany(CustomPayment::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function lowBalance()
    {
        return $this->hasOne(LowBalance::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function commonGuests()
    {
        return $this->hasMany(CommonGuest::class);
    }
}
