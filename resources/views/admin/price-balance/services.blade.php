@extends('admin.price-balance')

@section('price-balance-content')
<div class="row">
    <div class="col-lg-6">
        <x-nav-tab :isTab="true" :links="[
            ['name' => 'Twilio', 'route' => 'twilio-services', 'default' => true],
        ]" />
    </div>
</div>
<x-card>
    <div class="tab-content" id="myTabContent">
        <div class="tab-pane  show active" id="twilio-services" role="tabpanel" aria-labelledby="twilio-services-tab">
            <div class="row">
                <div class="col-lg-6">
                    <table class="text-sm table table-borderless table-responsive">
                        <tr>
                            <th>
                                {{ __("Dernière modification") }}:
                            </th>
                            <th>
                                <span class="ml-3">
                                    --
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                {{ __("Dernière vérification") }}:
                            </th>
                            <th>
                                <span class="ml-3">
                                    --
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                {{ __("Vérifier") }}:
                            </th>
                            <th>
                                <span class="ml-3">
                                    <button class="btn btn-icon btn-secondary text-primary btn-sm" type="button">
                                        {{ __('Vérifier') }}
                                    </button>
                                </span>
                            </th>
                        </tr>
                    </table>
                </div>

                <div class="col-lg-6">
                    <form>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="file" class="form-control"
                                    placeholder="{{ __('Fichier de tarification Twilio') }}" aria-label="pricing file"
                                    aria-describedby="basic-addon1">
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">.cvs</span>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-icon btn-primary btn-sm" type="button">
                            {{ __('Télécharger') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-card>
@endsection