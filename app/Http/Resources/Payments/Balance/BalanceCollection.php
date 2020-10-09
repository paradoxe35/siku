<?php

namespace App\Http\Resources\Payments\Balance;

use Illuminate\Http\Resources\Json\ResourceCollection;

class BalanceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return parent::toArray($request);
    }
}
