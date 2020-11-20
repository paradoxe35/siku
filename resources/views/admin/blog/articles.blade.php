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
    <div class="col-lg-3">
        <x-rform>
            <input type="text" name="q" value="{{ request('q') }}"
                class="form-control form-control-sm form-control-alternative" placeholder="{{ __('Recherche') }}" />
        </x-rform>
    </div>
    <div class="col-lg py-2"></div>
    <div class="col-lg-auto"></div>
</div>

<x-card-table :paginate="$articles" :sort="true" :ths="['ID', 'Image', 'Titre', 'Vues', 'Créé à', 'Status']">
    @foreach ($articles as $article)
    <tr class="clickable-a">
        <td class="text-center">{{ $article->id }}</td>
        <td>
            <div class="img-container">
                <img class="img-cover-full" src="{{ asset($article->image) }}">
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