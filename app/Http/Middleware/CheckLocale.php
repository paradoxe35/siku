<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\App;
use \Illuminate\Http\Request;

class CheckLocale
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
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
                $locale = $this->getAcceptedLocale($request);

                App::setLocale($locale);
            }
        }
        return $next($request);
    }

    /**
     * @param Request $request
     * @return String
     */
    protected function getAcceptedLocale($request)
    {
        $locale = explode(',', $request->server('HTTP_ACCEPT_LANGUAGE'));

        $lang = isset($locale[0]) ? explode('-', $locale[0]) : null;

        $lang = isset($lang[0]) ? $lang[0] : config('app.locale', 'fr');

        $locale = isset($_COOKIE['locale']) && !empty($_COOKIE['locale']) ? $_COOKIE['locale'] : $lang;

        return $locale;
    }
}
