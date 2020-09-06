<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SpinningDots extends Component
{

    public $color;
    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(?string $color =  '#5e72e4')
    {
        $this->color = $color;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return <<<'blade'
            <spinning-dots style="width:35px;stroke-width:5px;color: {{ $color }};" />
        blade;
    }
}
