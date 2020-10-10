@extends('template.report.layout.report-layout')

@section('report')
@include('template.report.layout.title', ['title' => __('Rapport'). ' ('. __('Historique de paiement'). ')'])
<br>
<table class="table table-bordered">
    <tr>
        <td width="50%">
            {{ __('ID') }} {{ __('Rapport') }} : {{ time() }}<br />
            {{ __('Mois') }}: {{ $month }}<br />
            {{ __('Année') }}: {{ $year }}<br />
        </td>
    </tr>
</table>
<br> <br>

<table class="table table-bordered" cellspacing="0">
    <thead>
        <tr>
            <th rowspan="2">{{ __('Id Paiement') }} </th>
            <th rowspan="2">{{ __('Date') }} </th>
            <th rowspan="2">{{ __('Moyen de paiement') }} </th>
            <th rowspan="2">{{ __('Montant') }}</th>
            <th rowspan="2">{{ __('code de devise') }}</th>
        </tr>
        <tr></tr>
    </thead>
    <tbody>
        @foreach ($histories as $history)
        <tr>
            <td>{{ $history['id'] }}</td>
            <td>{{ $history['created_at'] }}</td>
            <td>{{ isset($history['meta']['service']) ? $history['meta']['service'] : '' }}</td>
            <td>{{ $symbol.$history['amount'] }}</td>
            <td>{{ $history['meta']['currency_code']  }}</td>
        </tr>
        @endforeach
    </tbody>
</table>

@endsection