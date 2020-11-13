<?php

namespace App\Http\Resources\Admin\Customer\Purchase;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomerPurchase extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request),  [
            'created_at' => $this->created_at->format('Y-m-d H:i'),
            'hash' => $this->hashid(),
            'route' => route('admin.sales.show', ['id' => $this->id], false)
        ]);
    }
}
