<?php

namespace App\Http\Controllers\Livewire;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class LivewireController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $component = $request->query('component');

        abort_if(!$component, 400);


        $attribute = collect($request->all())
            ->except(['component'])
            ->values()
            ->toArray();

        return view('livewire.layout.app', compact('component', 'attribute'));
    }
}
