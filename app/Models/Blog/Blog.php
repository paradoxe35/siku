<?php

namespace App\Models\Blog;

use App\Infrastructure\Searchable\FullTextSearch;
use App\Models\Blog\BlogCategory;
use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    use FullTextSearch;

    /**
     * @var string
     */
    protected $table = 'blogs';

    /**
     * The columns of the full text index
     */
    protected $searchable = ['title'];

    /**
     * @var array
     */
    protected $fillable = ['title', 'slug', 'image', 'json', 'decription', 'author'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(BlogCategory::class);
    }
}
