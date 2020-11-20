<?php

namespace App\Http\Controllers\Admin\Blog;

use App\Http\Controllers\Controller;
use App\Models\Blog\Blog;
use App\Models\Blog\BlogCategory;
use App\Services\Og\OpenGraph;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class BlogController extends Controller
{

    /**
     * @var int SIZE
     */
    public const SIZE = 1024;

    /**
     * @var array
     */
    public const IMAGE_RULES = ['required', 'file', "max:" . (self::SIZE * 5) . "", 'dimensions:min_width=400,min_height=400', 'mimes:jpeg,jpg,png,gif'];

    /**
     * @var string MUSIC_IMG_PATH
     */
    public const BLOG_IMG_PATH = 'blog/articles';


    public function __construct()
    {
        $this->middleware(['optimizeImages']);
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
        $query = $this->query()->latest();

        $query =  $query->withTrashed();

        $articles = $query->paginate();

        return view('admin.blog.articles', compact('articles'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $categories = BlogCategory::query()->latest()->get();

        return view('admin.blog.create-article', compact('categories'));
    }

    /**
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'min:5', 'max:255', 'unique:blogs'],
            'author' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:255'],
            'category' => ['nullable', 'numeric', 'min:1'],
            'image' => self::IMAGE_RULES,
            'json' => ['required', 'json']
        ]);

        $article = Blog::query()->create([
            'title' => $request->title,
            'slug' => Str::slug($request->title),
            'json' => $request->json,
            'decription' => $request->description,
            'author' => $request->author,
            'blog_category_id' => $request->category
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->storePublicly(self::BLOG_IMG_PATH . "/{$article->id}");
            $article->image = Storage::url($path);
            $article->save();
        }

        return response()->json([
            'message' => trans("L'article a été créé avec succès"),
        ], 201);
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
}
