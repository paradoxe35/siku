<?php

namespace App\Models\Chat;

use App\User;
use Illuminate\Database\Eloquent\Model;

class TelegramReference extends Model
{
    /**
     * @var string
     */
    protected $table = 'telegram_references';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['user_id', 'chat_id', 'chat_username'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
