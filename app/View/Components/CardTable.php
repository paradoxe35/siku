<?php

namespace App\View\Components;

use Illuminate\View\Component;

class CardTable extends Component
{

    /**
     * @var array
     */
    public $ths = [];

    /**
     * @var bool
     */
    public $sort = false;


    /**
     * @var mixed
     */
    public $paginate = null;

    /**
     * Create a new component instance.
     *
     * @return void
     */
    public function __construct($ths = [], $sort = false, $paginate = null)
    {
        $this->ths = $ths;
        $this->sort = $sort;
        $this->paginate = $paginate;
    }

    /**
     * Get the view / contents that represent the component.
     *
     * @return \Illuminate\View\View|string
     */
    public function render()
    {
        return view('components.card-table');
    }
}
