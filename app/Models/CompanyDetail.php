<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompanyDetail extends Model
{
    /**
     * @var string
     */
    protected $table = 'company_details';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['public_email', 'private_email', 'public_phone', 'private_phone'];
}
