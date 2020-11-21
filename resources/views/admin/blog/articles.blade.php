@extends('admin.blog')

@section('head-secondary')
<style>
    table .img-container {
        width: 100%;
        height: 64px;
        width: 64px;
        overflow: hidden;
        border-radius: 7px;
    }
</style>
@endsection

@section('blog-content')
<div class="row mb-3">
    <div class="col">
        <x-rform>
            <input type="text" name="q" value="{{ request('q') }}"
                class="form-control form-control-sm form-control-alternative" placeholder="{{ __('Recherche') }}" />
        </x-rform>
    </div>
    <div class="col">
        <form action="" method="get" id="select-category">
            <select name="category" onchange="rform(document.getElementById('select-category'))"
                class="form-control-sm form-control w-auto d-inline-block">
                <option value="">{{ __('Catégories') }}</option>
                @foreach ($categories as $category)
                <option value="{{ $category->id }}" {{ request('category') == $category->id ? 'selected' : '' }}>
                    {{ $category->name }}
                </option>
                @endforeach
            </select>
        </form>
    </div>
    <div class="col-lg py-2"></div>
    <div class="col-lg-auto">
        <form action="" method="get" id="select-active">
            <select name="active" onchange="rform(document.getElementById('select-active'))"
                class="form-control-sm form-control w-auto d-inline-block">
                @foreach ([['all', 'Tout'], ['active', 'Actifs'], ['deleted', 'Supprimés'], ] as $item)
                <option value="{{ $item[0] }}" {{ request('active') == $item[0] ? 'selected' : '' }}>
                    {{ __($item[1]) }}
                </option>
                @endforeach
            </select>
        </form>
    </div>
</div>

<x-card-table :paginate="$articles" :sort="true" :ths="['ID', 'Image', 'Titre', 'Vues', 'Créé à', 'Status']">
    @foreach ($articles as $article)
    <tr class="clickable-a" onclick="tvisit('{{ route('admin.blog.show', ['id' => $article->id]) }}')">
        <td class="text-center">{{ $article->id }}</td>
        <td>
            <div class="img-container">
                <img class="img-cover-full" src="{{ asset($article->image_url) }}">
            </div>
        </td>
        <td>{{ Str::substr($article->title, 0, 35) }}...</td>
        <td>{{ $article->views }}</td>
        <td>{{ $article->created_at }}</td>
        <td>
            <x-status :value="!$article->trashed()" />
        </td>
    </tr>
    @endforeach
</x-card-table>
@endsection