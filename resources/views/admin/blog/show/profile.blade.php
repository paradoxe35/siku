@extends('admin.blog.show')

@section('blog-show-content')
<div data-controller="Blog--Article-Profile">
    <x-card>
        <table class="text-sm table table-borderless table-responsive">
            <tr>
                <th>
                    {{ __("Titre") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $article->title }}
                    </span>
                </th>
            </tr>
            <tr>
                <th>
                    {{ __("Vues") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $article->views }}
                    </span>
                </th>
            </tr>
            <tr>
                <th>
                    {{ __("Créé") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $article->created_at }}
                    </span>
                </th>
            </tr>
            <tr>
                <th>
                    {{ __("Description") }}:
                </th>
                <th>
                    <span class="ml-3">
                        {{ $article->description }}
                    </span>
                </th>
            </tr>
            <tr>
                <th>
                    {{ __("Status") }}:
                </th>
                <th>
                    <span class="ml-3">
                        <x-status :value="!$article->trashed() " />
                    </span>
                </th>
            </tr>
        </table>
        <div class="ml-4 mt-3">
            <div class="dropdown">
                <button data-target="Blog--Article-Profile.deleteBtn" data-url="{{ route('admin.blog.trash') }}"
                    class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {{ __('Supprimer') }} | {{ __('Restaurer') }}
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a data-action="Blog--Article-Profile#trash" class="dropdown-item clickable-a">
                        {{ __($article->trashed() ? 'Restaurer': 'Corbeille') }}
                    </a>
                    <a data-action="Blog--Article-Profile#destroy" class="dropdown-item clickable-a text-danger">
                        {{ __('Supprimer définitivement') }}
                    </a>
                </div>
            </div>
            <a href="{{ route('admin.blog.create', ['article' => $article->id]) }}"
                class="btn btn-secondary btn-sm text-primary">
                {{ __('Editer') }}
            </a>
        </div>

    </x-card>
</div>

@endsection