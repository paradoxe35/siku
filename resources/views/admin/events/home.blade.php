@extends('admin.events')


@section('events-content')
<div class="row mb-3">
    <div class="col-lg-5">
        <div class="row">
            <div class="col">
                <x-rform>
                    <input type="text" name="email" value="{{ request('email') }}"
                        class="form-control form-control-sm form-control-alternative"
                        placeholder="{{ __('Recherche') }} Email..." />
                </x-rform>
            </div>
            <div class="col">
                <x-rform>
                    <input type="text" name="q" value="{{ request('q') }}"
                        class="form-control form-control-sm form-control-alternative"
                        placeholder="{{ __("Nom de l'événement") }}..." />
                </x-rform>
            </div>
        </div>
    </div>
    <div class="col-lg py-2"></div>
    <div class="col-lg-auto">
        @include('admin.layouts.selects.active')
    </div>
</div>

<x-card-table :sort="true"
    :ths="['ID', 'Hash', 'Nom de l\'événement', 'Client Email', 'Invités', 'Créé à', 'Date d\'événement', 'actif']">
    @foreach ($events as $evnt)
    <tr class="clickable-a" onclick="tvisit('{{ route('admin.events.show', ['id' => $evnt->id]) }}')">
        <td>{{ $evnt->id }}</td>
        <td>{{ $evnt->hashId() }}</td>
        <td>{{ $evnt->name }}</td>
        <td>{{ $evnt->user->email }}</td>
        <td>{{ $evnt->guests()->count() }}</td>
        <td>{{ $evnt->created_at }}</td>
        <td>{{ $evnt->event_date }}</td>
        <td>
            <x-status :value="!$evnt->deleted_at" />
        </td>
    </tr>
    @endforeach
</x-card-table>
@endsection