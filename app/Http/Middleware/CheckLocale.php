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
        if ($request->expectsJson()) {

            App::setLocale($request->header('CLIENT-LANG', 'fr'));
        } else {

            if ($user && $user->locale) {
                App::setLocale($user->locale);
            } else {

                App::setLocale(isset($_COOKIE['locale']) && !empty($_COOKIE['locale']) ? $_COOKIE['locale'] : 'fr');
            }
        }
        return $next($request);
    }
}
