<?php

namespace App\Models\Event;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
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
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
