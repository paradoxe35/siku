<?php

namespace App\Http\Resources\Admin\Customer\CustomPayment;

use Illuminate\Http\Resources\Json\JsonResource;

class CustomPayment extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return array_merge(parent::toArray($request), [
            'charged' => !!$this->balance,
            'profile' => $this->balance ? route('admin.sales.show', ['id' => $this->balance->id], false) : null,
            'created_at' => $this->created_at->format('Y-m-d H:i'),
        ]);
    }
}
