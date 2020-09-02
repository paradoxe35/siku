<?php

namespace App\Models\Customer;

use Illuminate\Database\Eloquent\Model;

class CustomerRequest extends Model
{
    /**
     * @var string
     */
    protected $table = 'customer_requests';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['email', 'phone', 'subject', 'message', 'country_name', 'country_code', 'sended'];
}
