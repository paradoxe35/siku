<?php

namespace App\Providers;

use App\Http\Resources\Event\Event;
use App\Http\View\Composers\AdminSidebarComposer;
use App\Http\View\Composers\SidebarComposer;
use App\Infrastructure\BasePrice;
use App\View\Components\Card;
use App\View\Components\CardTable;
use App\View\Components\RForm;
use App\View\Components\SpinningDots;
use App\View\Components\Status;
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
        $this->components();

        $this->composers();
    }
    

    /**
     * @return void
     */
    private function components() {
        Blade::component('spinning-dots', SpinningDots::class);

        Blade::component('card-table', CardTable::class);

        Blade::component('status', Status::class);

        Blade::component('rform', RForm::class);

        Blade::component('card', Card::class);
    }

    /**
     * @return void
     */
    private function composers() {
        View::composer('*', function ($view) {
            $view->with('app_name', 'SiKu');

            $view->with('symbol', BasePrice::$symbol);

            $view->with('app_description', trans("Le meilleur et plus sûr moyen d'inviter vos membres et connaissances à vos événements"));

            $view->with('langs', [
                ['name' => trans('Anglais'), 'value' => 'en'],
                ['name' => trans('Français'), 'value' => 'fr']
            ]);
        });

        View::composer('customer.*', SidebarComposer::class);

        View::composer('admin.*', AdminSidebarComposer::class);

        View::composer('customer.*', function ($view) {
            $request = request();

            $user = $request->user();

            $eventId = $request->route('event');

            if ($user && $eventId) {
                $event = $user->events()->findByHashid($eventId);
                $ressource = new Event($event);
                $view->with('event', $ressource->toArray(null));
                $view->with('customer_event', $event);
            }
        });
    }
}
