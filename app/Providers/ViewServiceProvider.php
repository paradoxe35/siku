<?php

namespace App\Providers;

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
    }
}
