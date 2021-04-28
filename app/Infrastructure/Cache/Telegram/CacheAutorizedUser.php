<?php

namespace App\Infrastructure\Cache\Telegram;

use Illuminate\Support\Facades\Cache;

trait CacheAutorizedUser
{

    /**
     * @var string
     */
    private $redisKeyCache = 'telegram:autorized:chat:';


    /**
     * @return \Illuminate\Contracts\Cache\Repository
     */
    protected function cache()
    {
        return Cache::store('redis');
    }


    /**
     * @param int $eventId
     * 
     * @return mixed
     */
    protected function getAutorizedChatId($chatId)
    {
        return $this->cache()->get($this->redisKeyCache . $chatId);
    }

    /**
     * @param int $chatId
     * 
     * @return void
     */
    protected function putAutorizedChatId($chatId, $value = [])
    {
        $this->cache()->put($this->redisKeyCache . $chatId, $value, now()->addHours(168));
    }

    /**
     * @param int $chatId
     * 
     * @return void
     */
    protected function deleteAutorizedChatId($chatId)
    {
        $this->cache()->delete($this->redisKeyCache . $chatId);
    }
}
