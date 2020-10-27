<?php

namespace App\Infrastructure\Cache;

trait CachePendingMessageClient
{
    use CacheApp;

    /**
     * @var string
     */
    private $redisKeyCache = 'client:chat:pending:';

    /**
     * @param int $eventId
     * 
     * @return mixed
     */
    protected function getPendingMessageChat($userId)
    {
        return $this->cache()->get($this->redisKeyCache . $userId);
    }

    /**
     * @param int $userId
     * 
     * @return mixed
     */
    protected function hasPendingMessageChat($userId)
    {
        return $this->cache()->has($this->redisKeyCache . $userId);
    }

    /**
     * @param int $userId
     * 
     * @return void
     */
    protected function putPendingMessageChat($userId, $value = [])
    {
        $this->cache()->put($this->redisKeyCache . $userId, $value);
    }

    /**
     * @param int $userId
     * 
     * @return void
     */
    protected function deletePendingMessageChat($userId)
    {
        $this->cache()->delete($this->redisKeyCache . $userId);
    }
}
