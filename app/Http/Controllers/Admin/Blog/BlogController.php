<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Files\File;
use App\Http\Controllers\Controller;
use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use App\Services\Og\OpenGraph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class BlogController extends Controller
{

    public function __construct()
    {
        $this->middleware(['optimizeImages']);

        $this->middleware(function (Request $request, \Closure $next) {
            URL::defaults(['id' => $request->route('id')]);

            return $next($request);
        })->except(['index', 'create']);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function home()
    {
        return redirect(route('admin.blog.index'));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    private function query()
    {
        return Blog::query();
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = $this->categories();

        $query = $this->query()->latest();

        $q = request('q');

        if ($q && strlen($q) > 2) {
            $query = $query->search($q);
        }

        switch (request('active')) {
            case 'active':
                # code...
                break;
            case 'deleted':
                $query = $query->onlyTrashed();
                break;
            default:
                $query = $query->withTrashed();
                break;
        }

        $category = request('category');

        if ($category) {
            $c = BlogCategory::query()->find($category);
            if ($c) {
                $query = $c->blogs()->latest();
            }
        }



        $articles = $query->paginate();

        return view('admin.blog.articles', compact('articles', 'categories'));
    }

    /**
     * @return array
     */
    private function categories()
    {
        return BlogCategory::query()->latest()->get();
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = $this->categories();

        $articleEdit = null;

        if ($id = request('article')) {
            $articleEdit = $this->queryWithTrash($id);
        }

        return view('admin.blog.create-article', compact('categories', 'articleEdit'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'min:5', 'max:255', 'unique:blogs'],
            'author' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string', 'min:5', 'max:255'],
            'category' => ['nullable', 'numeric', 'min:1'],
            'image' => File::IMAGE_RULES,
            'json' => ['required', 'json']
        ]);

        $article = Blog::query()->create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'json' => $request->json,
            'description' => $request->description,
            'author' => $request->author,
            'blog_category_id' => $request->category
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->storePublicly(File::BLOG_IMG_PATH . "/{$article->id}");
            $article->image = $path;
            $article->save();
        }

        return response()->json([
            'message' => trans("L'article a été créé avec succès"),
        ], 201);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $imageRule = File::IMAGE_RULES;

        $imageRule[0] = 'nullable';

        $request->validate([
            'title' => ['required', 'string', 'min:5', 'max:255', Rule::unique('blogs')->ignore($id)],
            'author' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'numeric', 'min:1'],
            'image' => $imageRule,
            'json' => ['required', 'json']
        ]);

        $article = $this->queryWithTrash($id);

        $filled = $article->fill([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'json' => $request->json,
            'description' => $request->description,
            'author' => $request->author,
            'blog_category_id' => $request->category
        ]);

        if ($request->hasFile('image')) {
            Storage::delete($article->image);

            $path = $request->file('image')->storePublicly(File::BLOG_IMG_PATH . "/{$article->id}");
            $filled->image = $path;
        }

        $article->save();

        return [
            'message' => trans("L'article a été modifié avec succès"),
            'redirect_url' => route('admin.blog.create', [], false)
        ];
    }



    /**
     * @return \Illuminate\Http\Response
     */
    public function storeCaterory(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'min:2', 'max:255', 'unique:blog_categories'],
            'icon' => ['nullable', 'string'],
        ]);

        BlogCategory::query()->create([
            'name' => $request->name,
            'icon' => $request->icon
        ]);

        return response()->json([
            'message' => trans("Catégorie a été créé avec succès"),
            'datas' => $this->categories()
        ], 201);
    }

    /**
     * @param int $id
     * 
     * @return \Illuminate\Http\Response
     */
    public function destoryCaterory($id)
    {
        $c = BlogCategory::query()->findOrFail($id);

        $c->delete();

        return $this->categories();
    }

    /**
     * @param OpenGraph $og
     * @return array
     */
    public function editorLinkData(OpenGraph $og)
    {
        $graph = $og::fetch(urldecode(request('url')));
        if (!$graph) {
            return [
                'success' => 0,
                'message' => trans('Invalid Link')
            ];
        }
        return [
            'success' => 1,
            'meta' =>  [
                "title" => $graph->title ?: '',
                "description" => $graph->description ?: '',
                "image" => [
                    "url" => $graph->image ?: ''
                ]
            ]
        ];
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return redirect(route('admin.blog.show.profile'));
    }

    /**
     * @param int $id
     * 
     * @return static
     */
    private function queryWithTrash($id)
    {
        return $this->query()->withTrashed()->findOrFail($id);
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function showProfile($id)
    {
        $article = $this->queryWithTrash($id);

        return view('admin.blog.show.profile', compact('article'));
    }


    /**
     * @return \Illuminate\Http\Response
     */
    public function showContent($id)
    {
        $article = $this->queryWithTrash($id);

        return view('admin.blog.show.content', compact('article'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function showComments($id)
    {
        $article = $this->queryWithTrash($id);

        return view('admin.blog.show.comments', compact('article'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function trash($id)
    {
        $article = $this->queryWithTrash($id);

        if ($article->trashed()) {

            $article->restore();
        } else {

            $article->delete();
        }

        return [true];
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $article = $this->queryWithTrash($id);

        $article->forceDelete();

        Storage::delete($article->image);

        return ['redirect_url' => route('admin.blog.index', [], false)];
    }
}
