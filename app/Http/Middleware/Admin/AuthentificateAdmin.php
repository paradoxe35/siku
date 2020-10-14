<?php

namespace App\Http\Middleware\Admin;

use Closure;
use Illuminate\Validation\UnauthorizedException;

class AuthentificateAdmin
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

        if (!($user->is_admin && null !== $user->admin_token)) {

            abort(401);
        }

        return $next($request);
    }
}
