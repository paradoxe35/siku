<?php

namespace App\Infrastructure\Cache;

trait CacheJobEvent
{
    use CacheApp;

    /**
     * @var string
     */
    private $redisKeyCache = 'event:process:';

    /**
     * @param int $eventId
     * 
     * @return mixed
     */
    protected function getEventProcess($eventId)
    {
        return $this->cache()->get($this->redisKeyCache . $eventId);
    }

    /**
     * @param int $eventId
     * 
     * @return mixed
     */
    protected function hasEventProcess($eventId)
    {
        return $this->cache()->has($this->redisKeyCache . $eventId);
    }

    /**
     * @param int $eventId
     * 
     * @return void
     */
    protected function putEventProcess($eventId, $value = [])
    {
        $this->cache()->put($this->redisKeyCache . $eventId, $value);
    }

    /**
     * @param int $eventId
     * 
     * @return void
     */
    protected function deleteEventProcess($eventId)
    {
        $this->cache()->delete($this->redisKeyCache . $eventId);
    }
}
