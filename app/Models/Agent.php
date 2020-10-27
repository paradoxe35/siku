<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agent extends Model
{

    /**
     * The model's default values for attributes.
     *
     * @var array
     */
    protected $attributes = [
        'role' => 'agent',
    ];

    /**
     * @var string
     */
    protected $table = 'agents';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['name', 'phone', 'status', 'role', 'image'];
}
