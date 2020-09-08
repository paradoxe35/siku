<?php

namespace App\Models\Template;

use App\Models\Event\Event;
use App\User;
use Illuminate\Database\Eloquent\Model;

class Template extends Model
{
    /**
     * @var string
     */
    protected $table = 'templates';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'name', 'sms_total', 'per_sms', 'text_sms', 'text_whatsapp'];
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
}
