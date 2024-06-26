@extends('template.report.layout.report-layout')

@section('report')
@include('template.report.layout.title', ['title' => __('Rapport'). ' ('. __("Historique d'utilisation"). ')'])
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
            <th rowspan="2">{{ __('Date') }}</th>
            <th rowspan="2">{{ __('Montant consommé') }}</th>
            <th rowspan="2">{{ __('Code de devise') }}</th>
            <th rowspan="2">{{ __('Événement') }}</th>
        </tr>
        <tr></tr>
    </thead>
    <tbody>
        @foreach ($histories as $history)
        <tr>
            <td>{{ $history['date'] }}</td>
            <td>{{ $symbol.$history['amount'] }}</td>
            <td>{{ $history['currency_code']}}</td>
            <td>{{ $history['event']}}</td>
        </tr>
        @endforeach
    </tbody>
</table>

@endsection