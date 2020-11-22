<?php

namespace App\Models\Blog;

use App\Infrastructure\Searchable\FullTextSearch;
use App\Models\Blog\BlogCategory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class Blog extends Model
{
    use FullTextSearch, SoftDeletes;

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
    protected $fillable = ['title', 'slug', 'image', 'image_path', 'json', 'description', 'author', 'blog_category_id'];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function category()
    {
        return $this->belongsTo(BlogCategory::class);
    }

    /**
     * Get the event name
     *
     * @param  string  $value
     * @return string
     */
    public function getTitleAttribute($value)
    {
        return ucwords(Str::lower($value));
    }

    /**
     * Get the event name
     *
     * @param  string  $value
     * @return string
     */
    public function getAuthorAttribute($value)
    {
        return ucwords(Str::lower($value));
    }

    /**
     * Get the image path.
     *
     * @return string
     */
    public function getImageUrlAttribute()
    {
        return Storage::url($this->image);
    }
}
