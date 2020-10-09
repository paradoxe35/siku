<?php

namespace App\Http\Resources\Payments\Consumed;

use App\Infrastructure\BasePrice;
use Illuminate\Http\Resources\Json\JsonResource;

class Consumed extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'amount' => $this->total_amount,
            'date' => $this->date,
            'currency_code' => BasePrice::$currency_code,
            'event' => $this->event->name,
            'meta' => ['meta' => []]
        ];
    }
}
