<?php

namespace App\Infrastructure\Cache;

use Illuminate\Support\Facades\Cache;

trait CacheApp
{
    /**
     * @return \Illuminate\Contracts\Cache\Repository
     */
    protected function cache()
    {
        return Cache::store('redis');
    }

}
