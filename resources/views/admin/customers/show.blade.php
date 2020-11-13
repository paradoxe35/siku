@extends('admin.customers')

@section('breadcrumb-items')
<li class="breadcrumb-item active text-default" aria-current="page">
    {{  $customer->email  }}
</li>
@endsection

@section('customers-content')
<div class="row">
    <div class="col-12" data-controller="Customers--Customer-Show"
        data-Customers--Customer-Show-update="{{ route('admin.customers.update') }}"
        data-Customers--Customer-Show-events="{{ route('admin.customers.events') }}"
        data-Customers--Customer-Show-purchases="{{ route('admin.customers.purchases') }}"
        data-Customers--Customer-Show-low-balance="{{ route('admin.customers.low-balance') }}">
        <div class="text-center mt-5">
            <x-spinning-dots />
        </div>
    </div>
</div>
<script type="text/javascript">
    window.customer = @json($customer)
</script>
@endsection