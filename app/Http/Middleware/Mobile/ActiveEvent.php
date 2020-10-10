<?php

namespace App\Http\Middleware\Mobile;

use App\Exceptions\NotActiveEventException;
use Closure;

class ActiveEvent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /** @var \App\Models\Event\Validator  */
        $auth = $request->user();

        if (!$auth->event->active) {
            throw new NotActiveEventException;
        }

        return $next($request);
    }
}
