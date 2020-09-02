<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;

class CheckLocale
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
        $user = $request->user();
        if ($user && $user->locale) {
            App::setLocale($user->locale);
        } else {
            App::setLocale($request->cookies->get('locale', 'fr'));
        }
        return $next($request);
    }
}
