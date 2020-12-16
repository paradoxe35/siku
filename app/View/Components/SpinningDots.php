<?php

namespace App\View\Components;

use Illuminate\View\Component;

class SpinningDots extends Component
{

    /**
     * @var string
     */
    public $color;

    /**
     * @var string
     */
    public $id;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(?string $color =  '#5e72e4', ?string $id = null)
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
            <div {{ $id ? "id='".$id."'": '' }}>
                <spinning-dots style="width:30px;stroke-width:4px;color: {{ $color }};" />
            </div>
        blade;
    }
}
