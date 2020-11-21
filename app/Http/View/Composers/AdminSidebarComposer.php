<?php

namespace App\Http\View\Composers;

use Illuminate\View\View;

class AdminSidebarComposer
{

    public function __construct()
    {
    }

    /**
     * Bind data to the view.
     *
     * @param  View  $view
     * @return void
     */
    public function compose(View $view)
    {
        $sidebarLinkList = [
            [
                'name' => 'Acceuil',
                'icon' => 'chart-pie-35',
                'route' => 'admin.home'
            ],
            [
                'name' => 'Ventes',
                'icon' => 'credit-card',
                'route' => 'admin.sales.home'
            ],
            [
                'name' => 'Clients',
                'icon' => 'collection',
                'route' => 'admin.customers.home'
            ],
            [
                'name' => 'Événements',
                'icon' => 'air-baloon',
                'route' => 'admin.events.home'
            ],
            [
                'name' => 'Prix et balance',
                'icon' => 'spaceship',
                'route' => 'admin.price-balance.home'
            ],
            [
                'name' => 'Rapport',
                'icon' => 'books',
                'route' => 'admin.reports.home'
            ],
            [
                'name' => 'Blog',
                'icon' => 'ruler-pencil',
                'route' => 'admin.blog.home'
            ],
            [
                'name' => __('Paramètres'),
                'icon' => 'settings-gear-65',
                'route' => 'admin.settings.home'
            ],
        ];
        $view->with('adminSidebarLinkList', $sidebarLinkList);
    }
}
