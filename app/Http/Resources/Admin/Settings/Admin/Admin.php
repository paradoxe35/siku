<?php

namespace App\Http\Resources\Admin\Settings\Admin;

use Illuminate\Http\Resources\Json\JsonResource;

class Admin extends JsonResource
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
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'isAdmin' => $this->is_admin,
            'isSuperAdmin' => $this->super_admin,
            'trashed' => $this->trashed(),
            'created_at' => $this->created_at->format('Y-m-d H:i'),
        ];
    }
}
