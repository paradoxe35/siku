<?php

namespace App\Files;

class File
{
    /**
     * @var int SIZE
     */
    public const SIZE = 1024;

    /**
     * @var array
     */
    public const IMAGE_RULES = ['required', 'file', "max:" . (self::SIZE * 5) . "", 'dimensions:min_width=400', 'mimes:jpeg,jpg,png,gif'];

    /**
     * @var string MUSIC_IMG_PATH
     */
    public const BLOG_IMG_PATH = 'blog/articles';

    /**
     * @var string AGENTS_IMG_PATH
     */
    public const AGENTS_IMG_PATH = 'agents';
}
