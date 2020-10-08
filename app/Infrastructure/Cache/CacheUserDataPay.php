<?php

namespace App\Infrastructure\Cache;

use Illuminate\Support\Facades\Cache;

trait CacheUserDataPay
{

    private $redisKeyCache = 'user:data-pay:';

    /**
     * @return \Illuminate\Contracts\Cache\Repository
     */
    protected function cache()
    {
        return Cache::store('redis');
    }


    /**
     * @param int $userId
     * 
     * @return mixed
     */
    protected function getUserDataPay($userId)
    {
        return $this->cache()->has($this->redisKeyCache . $userId);
    }

    /**
     * @param int $userId
     * 
     * @return void
     */
    protected function putUserDataPay($userId, $value = [])
    {
        $this->cache()->put($this->redisKeyCache . $userId, $value);
    }

    /**
     * @param int $userId
     * 
     * @return void
     */
    protected function deleteUserDataPay($userId)
    {
        $this->cache()->delete($this->redisKeyCache . $userId);
    }
}
