<?php

namespace App\View\Components;

use Illuminate\View\Component;

class Status extends Component
{

    /**
     * @var bool
     */
    public $value;

    /**
     * @var string
     */
    public $active = '';

    /**
     * @var string
     */
    public $inactive = '';


    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(bool $value, string $active = '', string $inactive = '')
    {
        $this->value = $value;
        $this->active = $active;
        $this->inactive = $inactive;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.status');
    }
}
