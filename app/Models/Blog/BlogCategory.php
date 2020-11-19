<?php

namespace App\Models\Blog;

use Illuminate\Database\Eloquent\Model;

class BlogCategory extends Model
{
    /**
     * @var string
     */
    protected $table = 'blog_categories';

    /**
     * @var array
     */
    protected $fillable = ['name', 'icon'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function blogs()
    {
        return $this->hasMany(Blog::class);
    }
}
