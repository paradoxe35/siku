<?php

namespace App\View\Components;

use Illuminate\View\Component;

class RForm extends Component
{
    /**
     * @var string
     */
    public $id = '';

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(string $id = '')
    {
        $this->id = $id;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.r-form');
    }
}
