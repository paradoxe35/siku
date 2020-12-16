@extends('admin.customers')

@section('breadcrumb-items')
<li class="breadcrumb-item active text-default" aria-current="page">
    {{  $evnt->hashId()  }}
</li>
@endsection

@section('customers-content')
<div class="row">
    <div class="col-12" data-controller="Events--Event-Show"
        data-Events--Event-Show-trash="{{ route('admin.events.trash') }}"
        data-Events--Event-Show-templates="{{ route('admin.events.templates') }}"
        data-Events--Event-Show-guests="{{ route('admin.events.guests') }}"
        data-Events--Event-Show-validators="{{ route('admin.events.validators') }}"
        data-Events--Event-Show-event-menu-profile="{{ route('api.customer.events.event.profile') }}"
        data-Events--Event-Show-event-profile-items="{{ route('api.customer.events.event.profile.items') }}"
        data-Events--Event-Show-event-report-overview="{{ route('api.customer.events.event.report.overview') }}"
        data-Events--Event-Show-event-report-attended="{{ route('api.customer.events.event.report.attended') }}"
        data-Events--Event-Show-event-report-absent="{{ route('api.customer.events.event.report.absent') }}"
        data-Events--Event-Show-event-report-download="{{ route('api.customer.events.event.report.download') }}">
        <div class="text-center mt-5">
            <x-spinning-dots />
        </div>
    </div>
</div>
<script type="text/javascript">
    window._event = @json($evnt)
</script>
@endsection