<?php

namespace App\Infrastructure\Cache;

use Illuminate\Support\Facades\Cache;

trait CacheJobEvent
{
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
    protected function getEventProcess($eventId)
    {
        return $this->cache()->has('event:process:' . $eventId);
    }

    /**
     * @param int $eventId
     * 
     * @return void
     */
    protected function putEventProcess($eventId, $value = [])
    {
        $this->cache()->put('event:process:' . $eventId, $value);
    }

    /**
     * @param int $eventId
     * 
     * @return void
     */
    protected function deleteEventProcess($eventId)
    {
        $this->cache()->delete('event:process:' . $eventId);
    }
}
