@extends('admin.price-balance')

@section('price-balance-content')
<div class="row" data-controller="PriceBalance--Default-Balance">
    <div class="col-lg-6">
        <form data-target="PriceBalance--Default-Balance.form" autocomplete="off"
            action="{{ route('admin.price-balance.default-balance') }}" method="POST">
            <div class="form-group">
                <label for="mail" class="form-control-label">{{ __('Mail') }}</label>
                <input class="form-control" type="text" name="mail" value="{{ $balance ? $balance->mail : 0 }}"
                    id="mail">
            </div>
            <div class="form-group">
                <label for="sms" class="form-control-label">{{ __('SMS') }}</label>
                <input class="form-control" type="text" name="sms" value="{{ $balance ? $balance->sms : 0 }}" id="sms">
            </div>
            <div class="d-flex justify-content-between">
                <button class="btn btn-primary btn-sm" type="submit">
                    {{ __('Enregistrer les modifications') }}
                </button>
                <button data-target="PriceBalance--Default-Balance.clear" class="btn btn-secondary text-danger btn-sm"
                    type="button">
                    {{ __('Supprimer') }}
                </button>
            </div>
        </form>
    </div>
</div>
@endsection