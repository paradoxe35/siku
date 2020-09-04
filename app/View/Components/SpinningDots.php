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
            <spinning-dots style="width:40px;stroke-width:6px;color: {{ $color }};" />
        blade;
    }
}
