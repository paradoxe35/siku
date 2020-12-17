<?php

namespace App\View\Components;

use Illuminate\Support\Str;
use Illuminate\View\Component;

class Collapse extends Component
{

    /**
     * @var bool
     */
    public $expanded;


    /**
     * @var int
     */
    public $id;

    /**
     * @var string
     */
    public $parentId;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct(bool $expanded = false, string $parentId)
    {
        $this->expanded = $expanded;
        $this->parentId = $parentId;
        $this->id = Str::random();
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\Contracts\View\View|string
     */
    public function render()
    {
        return view('components.collapse');
    }
}
