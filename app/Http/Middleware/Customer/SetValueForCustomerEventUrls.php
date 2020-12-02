<?php

namespace App\Http\Middleware\Customer;

use Closure;
use Illuminate\Support\Facades\URL;

class SetValueForCustomerEventUrls
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
        $eventId = $request->route('event');

        $user = $request->user();

        if (!$user->events()->findByHashid($eventId)) {
            return redirect(route('customer.events'));
        }

        URL::defaults(['event' => $eventId]);

        return $next($request);
    }
}
