<?php

namespace App\Http\Controllers;

use App\Models\Blog\Blog;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the application home.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $articles = Blog::query()->latest()->limit(2)->get();

        return view('home', compact('articles'));
    }
}
