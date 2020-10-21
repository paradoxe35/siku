@extends('customer')

@section('customer-content')
<div data-controller="Customer--Settings"
    data-Customer--Settings-event-update="{{ route('api.customer.events.update') }}"
    data-Customer--Settings-event-settings-route="{{ route('customer.event.settings') }}">
    <div class="row">
        <div class="col">
            <h1 class="display-4">{{ __('Paramètres') }}</h1>
        </div>
        <div class="col-auto">
            <button type="submit" data-target="Customer--Settings.modify"
                class="btn btn-secondary text-primary btn-sm d-inline-flex align-content-center">
                <span>{{ __("Modifier") }}</span>
            </button>
        </div>
    </div>
    <div data-target="Customer--Settings.content">
        <div class="text-center mt-5" style="display: none" data-target="Customer--Settings.spinning">
            <x-spinning-dots />
        </div>
        <div class="card mt-4 shadow-sm" data-target="Customer--Settings.cardContent">
            <div class="card-body">
                <table class="text-sm table table-borderless">
                    <tr>
                        <th>
                            {{ __("Evénement") }}:
                        </th>
                        <th>
                            <span class="ml-3">
                                {{ $event['name'] }}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            {{ __("Date d'événement") }}:
                        </th>
                        <th>
                            <span class="ml-3">
                                {{ $event['event_date'] }}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            {{ __("Créé") }}:
                        </th>
                        <th>
                            <span class="ml-3">
                                {{ $event['created_at'] }}
                            </span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            {{ __("Description") }}:
                        </th>
                        <th>
                            <span class="ml-3">
                                {{ $customer_event->desciption }}
                            </span>
                        </th>
                    </tr>
                </table>

                <div class="d-flex justify-content-end">
                    <button type="submit" data-target="Customer--Settings.deactivate"
                        class="btn btn-secondary {{ $event['active'] ? 'text-danger' : 'text-primary' }}  btn-sm d-inline-flex align-content-center">
                        {{ __($event['active'] ? "Désactiver" : "Activer") }}
                    </button>
                    <button type="submit" data-redirect="{{ route('customer.events') }}"
                        data-url="{{ route('api.customer.events.destroy') }}" data-target="Customer--Settings.delete"
                        class="btn btn-secondary text-danger btn-sm d-inline-flex align-content-center">
                        <span>{{ __("Supprimer") }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection