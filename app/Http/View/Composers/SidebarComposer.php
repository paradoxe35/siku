<?php

namespace App\Http\View\Composers;

use Illuminate\View\View;

class SidebarComposer
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
                [
                    'name' => __('Produit'),
                    'icon' => 'archive-2',
                    'route' => 'customer.event.product'
                ],
                [
                    'name' => __('Utilisation'),
                    'icon' => 'spaceship',
                    'route' => 'customer.event.utilization'
                ],
                [
                    'name' => __('Rapport'),
                    'icon' => 'books',
                    'route' => 'customer.event.report'
                ],
            ],
            [
                [
                    'name' => __('Paramètre'),
                    'icon' => 'settings-gear-65',
                    'route' => 'customer.event.settings'
                ],
                [
                    'name' => __('Compte'),
                    'icon' => 'circle-08',
                    'route' => 'customer.event.account'
                ],
                [
                    'name' => __('Mes événements'),
                    'icon' => 'bullet-list-67',
                    'route' => 'customer.events'
                ],
            ],
        ];
        $view->with('sidebarLinkList', $sidebarLinkList);
    }
}
