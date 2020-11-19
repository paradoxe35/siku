<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function home()
    {
        return redirect(route('admin.blog.index'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('admin.blog.articles');
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admin.blog.create-article');
    }
}
