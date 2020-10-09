@extends('template.report.layout.report-layout')

@section('report')
@include('template.report.layout.title', ['title' => __('Rapport')])
<br>
<table class="table table-bordered">
    <tr>
        <td width="50%">
            {{ __('ID') }} {{ __('Rapport') }} : {{ time() }}<br />
            {{ __('Nom de l\'événement') }}: {{ $event->name }}<br />
            {{ __('Date de l\'événement') }}: {{ $event->event_date }}<br />
        </td>
        <td width="50%">
            {{ __('Invités enregistrés') }}: {{ $event->guests->count() }}<br />
            {{ __('Invités présents') }}: {{ $attended->count() }}<br />
            {{ __('Invités absents') }}: {{ $absents->count() }}<br />
            {{ __('Fonds utilisé') }}: {{ $symbol }}{{ $event->totalConsumeds() }}<br />
        </td>
    </tr>
</table>
<br> <br>
<h3 style="text-align: center">{{ __('Invités présents') }}</h3>
<table class="table table-bordered" cellspacing="0">
    <thead>
        <tr>
            <th rowspan="2">No.</th>
            <th rowspan="2">{{ __('Nom') }}</th>
            <th rowspan="2">{{ __('Numéro de téléphone') }}</th>
            <th rowspan="2">{{ __('Autorisés') }}</th>
            <th rowspan="2">{{ __("Code d'autorisation") }}</th>
            <th rowspan="2">{{ __("Service utilisé") }}</th>
            <th rowspan="2">{{ __("Validé par") }}</th>
            <th rowspan="2">{{ __('Validé Temps') }}</th>
        </tr>
        <tr></tr>
    </thead>
    <tbody>
        @foreach ($attended as $attend)
        <tr>
            <td>{{ $attend->id }}</td>
            <td>{{ $attend->guest->name }}</td>
            <td>{{ $attend->guest->phone }}</td>
            <td>{{ $attend->guest->autorized }}</td>
            <td>{{ $attend->guest->code }}</td>
            <td>{{ implode(', ',$attend->guest->services()) }}</td>
            <td>{{ $attend->validator->name }}</td>
            <td>{{ $attend->created_at }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
<br /><br>
<h3 style="text-align: center">{{ __('Invités absents') }}</h3>
<table class="table table-bordered" cellspacing="0">
    <thead>
        <tr>
            <th rowspan="2">No.</th>
            <th rowspan="2">{{ __('Nom') }}</th>
            <th rowspan="2">{{ __('Numéro de téléphone') }}</th>
            <th rowspan="2">{{ __('Autorisés') }}</th>
            <th rowspan="2">{{ __("Service utilisé") }}</th>
        </tr>
        <tr></tr>
    </thead>
    <tbody>
        @foreach ($absents as $guest)
        <tr>
            <td>{{ $guest->id }}</td>
            <td>{{ $guest->name }}</td>
            <td>{{ $guest->phone }}</td>
            <td>{{ $guest->autorized }}</td>
            <td>{{ implode(', ',$guest->services()) }}</td>
        </tr>
        @endforeach
    </tbody>
</table>
@endsection