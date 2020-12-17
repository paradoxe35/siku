<?php

namespace App\Http\Middleware;

use App\Providers\RouteServiceProvider;
use Closure;
use Illuminate\Support\Facades\Auth;
use \App\User;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        $auth = Auth::guard($guard);

        if ($auth->check()) {
            $user = $auth->user();

            if ($user instanceof User && $user->isAdmin()) {
                return redirect(route('admin.home', [], false));
            } else {
                return redirect(RouteServiceProvider::HOME);
            }
        }

        return $next($request);
    }
}
