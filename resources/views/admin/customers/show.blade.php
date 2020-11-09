@extends('admin.customers')

@section('breadcrumb-items')
<li class="breadcrumb-item active text-default" aria-current="page">
    {{  $customer->email  }}
</li>
@endsection

@section('customers-content')

@endsection