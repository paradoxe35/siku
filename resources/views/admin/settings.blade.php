@extends('admin.layouts.admin')

@section('title', __("Paramètres").' | ')

@section('admin-content')

<div data-controller="Settings--Settings"
    data-Settings--Settings-account-update="{{ route('admin.settings.account.update') }}"
    data-Settings--Settings-account-update-password="{{ route('admin.settings.account.update.password') }}"
    data-Settings--Settings-admins-index="{{ route('admin.settings.admins.index') }}"
    data-Settings--Settings-admins-store="{{ route('admin.settings.admins.store') }}"
    data-Settings--Settings-agents-index="{{ route('admin.settings.agents.index') }}"
    data-Settings--Settings-agents-store="{{ route('admin.settings.agents.store') }}"
    data-Settings--Settings-cmp-details-index="{{ route('admin.settings.cmp-details.index') }}"
    data-Settings--Settings-cmp-details-store="{{ route('admin.settings.cmp-details.store') }}">
    @include('admin.layouts.breadcrumb', ['page' => 'Paramètres'])
    {{-- @include('layouts.unconfirmed-email') --}}
    <div class="row">
        <div class="col-12">
            <div class="mt-5" data-target="Settings--Settings.content">
                <div class="text-center">
                    <x-spinning-dots />
                </div>
            </div>
        </div>
    </div>
</div>
<script type="text/javascript">
    window.admin = Object.assign({ 
        superAdmin: {{ Auth::user()->super_admin ? 1 : 0 }},
        isAdmin: {{ Auth::user()->is_admin ? 1 : 0 }},
     }, @json(Auth::user()));
</script>
@endsection