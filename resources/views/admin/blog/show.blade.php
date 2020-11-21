@extends('admin.layouts.admin')

@section('title', __("Blog").' | ')

@section('admin-content')
<div data-controller="Blog--Blog">
    @include('admin.layouts.breadcrumb', ['page' => 'Blog', 'pages' => [$article->slug, $article->id]])
    <div class="pt-3">
        <x-nav-tab :isTab="false" :links="[
            ['name' => 'Profil', 'route' => 'admin.blog.show.profile'],
            ['name' => 'Contenu', 'route' => 'admin.blog.show.content'],
            ['name' => 'Commentaires', 'route' => 'admin.blog.show.comments'],
        ]" />
    </div>
    <div class="my-3">
        @yield('blog-show-content')
    </div>
</div>
@endsection