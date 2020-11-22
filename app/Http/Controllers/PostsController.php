<?php

namespace App\Http\Controllers;

use App\Models\Blog\Blog;
use Illuminate\Http\Request;

class PostsController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $articles = Blog::query()->latest()->paginate();

        return view('blog', compact('articles'));
    }

    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $slug)
    {
        $article = Blog::query()->where('slug', $slug)->firstOrFail();

        return view('blog.show', compact('article'));
    }
}
