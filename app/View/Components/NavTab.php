<?php

namespace App\View\Components;

use Illuminate\View\Component;

class NavTab extends Component
{

    /**
     * @var bool
     */
    public $isTab = true;

    /**
     * @var array
     */
    public $links = [];

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(bool $isTab = true, array $links = [])
    {
        $this->isTab = $isTab;
        $this->links = $links;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.nav-tab');
    }
}
