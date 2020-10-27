<?php

namespace App\Repositories;

use App\Models\Chat\TelegramReference;
use App\Models\Event\Event;

class TelegramRefRepository
{

    /**
     * @param mixed $chatId
     * 
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function getByChatId($chatId)
    {
        return TelegramReference::query()->firstWhere('chat_id', $chatId);
    }

    /**
     * @param mixed $userId
     * 
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function getByUserId($userId)
    {
        return TelegramReference::query()->firstWhere('user_id', $userId);
    }


    /**
     * @param array $userId
     * 
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public static function create(array $datas)
    {
        return TelegramReference::create($datas);
    }
}
