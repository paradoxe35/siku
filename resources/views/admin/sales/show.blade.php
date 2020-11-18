@extends('admin.sales')

@section('breadcrumb-items')
<li class="breadcrumb-item active text-default" aria-current="page">{{  $sale->hashId()  }}</li>
@endsection

@section('sales-content')
<div class="row justify-content-between">
    <div class="col-lg-7">
        <x-card>
            <div class="row">
                <div class="col-lg-6">
                    <div class="row">
                        <div class="col-lg">
                            <h4>{{ __('Date') }}</h4>
                            <span>{{ $sale->created_at }}</span>
                        </div>
                        <div class="col-lg">
                            <h4>{{ __('Confirmé') }}</h4>
                            <label class="custom-toggle">
                                <input data-target="Sales--Sales.confirmed" type="checkbox"
                                    {{ $sale->confirmed ? 'checked' : '' }}>
                                <span class="custom-toggle-slider rounded-circle" data-label-off="{{ __('Non') }}"
                                    data-label-on="{{ __('Oui') }}"></span>
                            </label>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <h4>{{ __('Client') }}</h4>
                    <p><span class="text-muted">{{ __('ID') }}</span>: {{ $sale->user->id }}</p>
                    <p>
                        <span class="text-muted">{{ __('Email') }}</span>:
                        <a
                            href="{{ route('admin.customers.show', ['id' => $sale->user->id]) }}">{{ $sale->user->email }}</a>
                    </p>
                    <p><span class="text-muted">{{ __('Téléphone') }}</span>: {{ $sale->user->phone }}</p>
                </div>
            </div>

            <div class="table-responsive mt-3">
                <table class="table align-items-center table-hover">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">{{ __('Montant') }}</th>
                            <th scope="col">{{ __('Revenu') }}</th>
                            <th scope="col">{{ __('Invités') }}</th>
                            <th scope="col">{{ __('Méthode') }}</th>
                            @if ($sale->token)
                            <th scope="col">{{ __('Paiement personnalisé') }} (Token)</th>
                            @endif
                        </tr>
                    </thead>
                    <tbody class="list">
                        <tr>
                            <td>{{ $symbol.$sale->amount }}</td>
                            <td>{{ $symbol.$sale->revenue() }}</td>
                            <td>{{ $sale->guests }}</td>
                            <td>{{ __($sale->paymentMeta->service) }}</td>
                            @if ($sale->token)
                            <td>{{ $sale->token }}</td>
                            @endif
                        </tr>
                    </tbody>
                </table>
            </div>

            <x-slot name="footer">
                <div class="d-flex justify-content-between">
                    <button type="button" data-url="{{ route('admin.sales.show', ['id' => $sale->id]) }}"
                        data-target="Sales--Sales.update"
                        class="btn btn-primary btn-sm">{{ __('Enregistrer') }}</button>
                    <button type="button" data-target="Sales--Sales.delete"
                        class="btn btn-secondary text-danger btn-sm">{{ __('Supprimer') }}</button>
                </div>
            </x-slot>
        </x-card>
    </div>
    @if ($sale->paymentMeta->datas)
    <div class="col-lg-5">
        <x-card>
            @dump(json_decode($sale->paymentMeta->datas))
        </x-card>
    </div>
    @endif

</div>
@endsection