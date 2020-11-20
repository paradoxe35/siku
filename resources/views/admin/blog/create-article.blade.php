@extends('admin.blog')
@section('body-attr', "
data-controller=Blog--New-Article data-Blog--New-Article-link-endpoint=".route('admin.blog.editor-link')."")

@section('bottom-body')
<div class="modal fade" data-target="Blog--New-Article.modalViewer" tabindex="-1" role="dialog"
    aria-labelledby="custom-payment-modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body"></div>
        </div>
    </div>
</div>

<div class="modal fade" data-target="Blog--New-Article.categoryModal" tabindex="-1" role="dialog"
    aria-labelledby="custom-payment-modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">{{ __('Catégories') }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6">
                        <form data-target="Blog--New-Article.storeCategory" autocomplete="off"
                            action="{{ route('admin.blog.store-caterory') }}" method="POST">
                            <div class=" form-group">
                                <span>{{ __('Nom') }}</span>
                                <input type="text" name="name" required class="form-control form-control-sm"
                                    placeholder="{{ __('Nom') }} {{ __('Catégorie') }}">
                            </div>
                            <div class="form-group">
                                <span>{{ __('Icon') }}</span>
                                <textarea disabled class="form-control" name="icon" placeholder="{{ __('Icon') }}"
                                    rows="3"></textarea>
                            </div>
                            <button type="submit" class="btn btn-primary btn-sm">{{ __('Enregistrer') }}</button>
                        </form>
                    </div>
                    <div class="col-lg-6">
                        <div class="table-responsive">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th scope="col">{{ __('Icon') }}</th>
                                        <th scope="col">{{ __('Nom') }}</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody data-target="Blog--New-Article.categoryList">
                                    @foreach ($categories as $category)
                                    <tr>
                                        <td>
                                            <x-avatar-icon :icon="$category->icon" />
                                        </td>
                                        <td>{{ $category->name }}</td>
                                        <td>
                                            <button type="button" data-category-del="{{ $category->id }}"
                                                class="btn btn-secondary btn-sm text-danger active">
                                                <i class="ni ni-fat-remove clickable-a text-primary"></i>
                                            </button>
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('blog-content')
<form data-target="Blog--New-Article.store" action="{{ route('admin.blog.store') }}" method="post" autocomplete="off"
    enctype="multipart/form-data">
    <div class="row">
        <div class="col-lg-6">
            <div class="form-group">
                <span>{{ __('Titre') }}</span>
                <input type="text" name="title" data-target="Blog--New-Article.title" class="form-control"
                    placeholder="{{ __('Sujet') }}">
            </div>
            <div class="form-group">
                <span>{{ __('Auteur') }}</span>
                <input name="author" class="form-control" value="{{ $app_name }}" placeholder="{{ __('Auteur') }}">
            </div>
            <div class="form-group my-3">
                <div class="w-100">
                    <label for="categories">
                        {{ __('Catégories') }}
                        <button type="button" data-target="Blog--New-Article.categoryBtn"
                            class="btn btn-secondary btn-sm text-primary active">
                            <i class="ni ni-fat-add clickable-a text-primary"></i> {{ __('Ajouter') }}
                        </button>
                    </label>
                    <select data-target="Blog--New-Article.categories" id="categories" class="form-control"
                        name="category">
                        <option value=" ">{{ __('Catégories') }}</option>
                        @foreach ($categories as $category)
                        <option value="{{  $category->id }}">
                            {{ $category->name }}
                        </option>
                        @endforeach
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label>{{ __('Description') }}</label>
                <textarea type="text" class="form-control" name="description" placeholder="{{ __('Meta description') }}"
                    rows="2"></textarea>
            </div>
        </div>
        <div class="col-lg-6">
            <div class="form-group">
                <label>{{ __('Image') }}</label>
                <input type="file" class="dropify" accept="image/*" data-allowed-file-extensions="jpg jepg png gif"
                    name="image" data-max-file-size="5M" />
            </div>

        </div>
    </div>

    <div class="row py-3">
        <div class="col-12">
            <div class="news">
                <div class="editor-landing">
                    <div class="text-center mb-3"><b>{{ __('Contenu') }}</b></div>
                    <x-card>
                        <div id="editorjs"></div>
                    </x-card>
                </div>
            </div>
        </div>
    </div>

    <div>
        <button type="submit" class="btn btn-primary btn-sm">{{ __('Enregistrer') }}</button>
        <a type="button" data-target="Blog--New-Article.preview"
            class="btn btn-secondary btn-sm text-primary">{{ __('Aperçu') }}</a>
    </div>
</form>
@endsection