@extends('admin.blog')

@section('blog-content')
<div class="row mb-3">
    <div class="col-lg-3">
        <input type="text" class="form-control form-control-sm form-control-alternative"
            placeholder="{{ __('Recherche...') }}" />
    </div>
    <div class="col-lg py-2"></div>
    <div class="col-lg-auto">
    </div>
</div>

<div class="card shadow-sm">
    <div class="card-body">

    </div>
</div>
@endsection