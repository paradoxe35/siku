<?php

namespace App\Providers;

use App\Http\Resources\Event;
use App\Http\View\Composers\SidebarComposer;
use App\View\Components\SpinningDots;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Blade;


class ViewServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        View::composer('*', function ($view) {
            $view->with('app_name', 'Ndowa');

            $view->with('langs', [
                ['name' => trans('Anglais'), 'value' => 'en'],
                ['name' => trans('Français'), 'value' => 'fr']
            ]);
        });

        Blade::component('spinning-dots', SpinningDots::class);

        View::composer('customer.*', SidebarComposer::class);

        View::composer('customer.*', function ($view) {
            $request = request();

            $user = $request->user();

            $eventId = $request->route('event');

            if ($user && $eventId) {
                $event = $user->events()->findByHashid($eventId);
                $ressource = new Event($event);
                $view->with('event', $ressource->toArray($request));
            }
        });
    }
}
