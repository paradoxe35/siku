<?php

namespace App\Models\Event;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Validator extends Model
{
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
        'name', 'username' , 'phone', 'country_code', 'country_call', 'user_id', 'sended_sms'
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
    public function getSendedSmsAttribute($value)
    {
        return boolval($value);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
