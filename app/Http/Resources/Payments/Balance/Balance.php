<?php

namespace App\Http\Resources\Payments\Balance;

use App\Infrastructure\BasePrice;
use Illuminate\Http\Resources\Json\JsonResource;
use Vinkla\Hashids\Facades\Hashids;

class Balance extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        /** @var  mixed */
        $h = new Hashids;
        return [
            'id' => $h::encode($this->id),
            'amount' => $this->amount,
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'meta' => $this->paymentMeta ?: [
                'currency_code' => BasePrice::$currency_code
            ]
        ];
    }
}
