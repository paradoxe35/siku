@extends('customer')


@section('customer-content')
<div data-controller="Customer--Report"
    data-Customer--Report-event-report-overview="{{ route('api.customer.events.event.report.overview') }}"
    data-Customer--Report-event-report-attended="{{ route('api.customer.events.event.report.attended') }}"
    data-Customer--Report-event-report-absent="{{ route('api.customer.events.event.report.absent') }}"
    data-Customer--Report-event-report-download="{{ route('api.customer.events.event.report.download') }}">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Rapport') }}</h1>
        </div>
        <div class="col-auto text-xs">
            <i class="ni ni-calendar-grid-58 text-primary"></i>
            {{ __("Date d'événement") }} <br>
            <span class="ml-3">({{ $event['event_date'] }})</span>
        </div>
    </div>
    <div class="row">
        <div class="col-12" data-target="Customer--Report.content">
            <div class="text-center mt-5">
                <x-spinning-dots />
            </div>
        </div>
    </div>
</div>
@endsection