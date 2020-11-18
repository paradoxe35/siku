@extends('admin.price-balance')

@section('body-attr', "data-controller=PriceBalance--Custom-Payment")

@section('bottom-body')
<div class="modal fade" id="custom-payment-modal" tabindex="-1" role="dialog"
    aria-labelledby="custom-payment-modalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <form action="{{ route('admin.price-balance.custom-payment.store') }}"
                data-target="PriceBalance--Custom-Payment.store" method="POST">
                <div class="modal-header">
                    <h5 class="modal-title" id="custom-payment-modalLabel">{{ __('Paiement personnalisé') }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <div class="modal-body py-0">
                    <div class="row">
                        <div class="col">
                            <div class="form-group">
                                <label>{{ __('Recherche Client') }}</label>
                                <select class="text-sm w-100"
                                    data-search-url="{{ route('admin.price-balance.custom-payment.search-client') }}"
                                    data-target="PriceBalance--Custom-Payment.selectField" style="margin-top: 3px;"
                                    data-toggle="select">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h5>{{ __('Client Paie profile') }}</h5>
                            <div class="mt-3" data-target="PriceBalance--Custom-Payment.clientPay"></div>
                        </div>
                    </div>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary btn-sm" data-dismiss="modal">
                        {{ __('Fermer') }}
                    </button>
                    <button type="submit" class="btn btn-primary btn-sm">
                        {{ __('Enregister') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
@endsection

@section('price-balance-content')
<button class="btn btn-primary btn-sm" data-toggle="modal" data-target="#custom-payment-modal" type="button">
    {{ __('Ajouter') }}
</button>

<div class="row my-3">
    <div class="col-lg-3">
        <x-rform>
            <input type="text" name="email" value="{{ request('email') }}"
                class="form-control form-control-sm form-control-alternative"
                placeholder="{{ __('Recherche') }} Email..." />
        </x-rform>
    </div>
    <div class="col-lg py-2"></div>
    <div class="col-lg-auto">
        @include('admin.layouts.selects.authorized')
    </div>
</div>

<x-card-table :sort="true" :paginate="$payments"
    :ths="['ID', 'Client Email', 'Code Paiement', 'Montant', 'Invités', 'Créé à', 'Chargé', 'Autorisé', 'Action']">
    @foreach ($payments as $payment)
    <tr>
        <td>{{ $payment->id }}</td>
        <td>{{ $payment->user->email }}</td>
        <td>{{ $payment->payment_code }}</td>
        <td>{{ $symbol.$payment->amount }}</td>
        <td>{{ $payment->guests }}</td>
        <td>{{ $payment->created_at }}</td>
        <td>
            <x-status :value="!!$payment->balance" />
            @if ($payment->balance)
            <a href="{{ route('admin.sales.show', ['id' => $payment->balance->id]) }}">{{ __('Profile') }}</a>
            @endif
        </td>
        <td>
            <x-status :value="!!$payment->active" />
        </td>
        <td>
            <button type="button" data-target="PriceBalance--Custom-Payment.action"
                data-url="{{ route('admin.price-balance.custom-payment.trash', ['id' => $payment->id]) }}"
                class="btn btn-secondary {{ $payment->active ? ' text-danger': 'text-primary' }} btn-sm active">
                {{ __($payment->active ? 'Supprimer': 'Autoriser') }}
            </button>
        </td>
    </tr>
    @endforeach
</x-card-table>

@endsection