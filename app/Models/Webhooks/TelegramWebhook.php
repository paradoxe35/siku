<?php

namespace App\Models\Webhooks;

use Illuminate\Database\Eloquent\Model;

class TelegramWebhook extends Model
{
    /**
     * @var string
     */
    protected $table = 'telegram_webhooks';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['datas'];
}
