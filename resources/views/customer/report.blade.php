@extends('customer')


@section('customer-content')
<div data-controller="Customer--Report"
    data-Customer--Report-event-report-overview="{{ route('api.customer.events.event.report.overview') }}"
    data-Customer--Report-event-report-attended="{{ route('api.customer.events.event.report.attended') }}"
    data-Customer--Report-event-report-absent="{{ route('api.customer.events.event.report.absent') }}"
    data-Customer--Report-event-report-download="{{ route('api.customer.events.event.report.download') }}">
    <h1 class="display-4">{{ __('Rapport') }}</h1>
    <div class="row">
        <div class="col-12" data-target="Customer--Report.content">
            <div class="text-center mt-5">
                <x-spinning-dots />
            </div>
        </div>
    </div>
</div>
@endsection