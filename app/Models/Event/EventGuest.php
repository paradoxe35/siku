<?php

namespace App\Models\Event;

use Illuminate\Database\Eloquent\Model;

class EventGuest extends Model
{
    /**
     * @var string
     */
    protected $table = 'event_guests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['guest'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
