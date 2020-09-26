<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Events\QueryExecuted;
use Illuminate\Support\Facades\DB;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        if($this->app->environment() === 'local') {
            // if (isset($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI'])) {
            //     file_put_contents('php://stdout', "\e[33m[HTTP::{$_SERVER['REQUEST_METHOD']}] \e[0m{$_SERVER['REQUEST_URI']}\n");
            // }
            // DB::listen(function(QueryExecuted $query) {
            //     file_put_contents('php://stdout', "\e[34m{$query->sql}\t\e[37m". json_encode($query->bindings) . "\t\e[32m{$query->time}ms\e[0m\n");
            // });
        }
    }
}
