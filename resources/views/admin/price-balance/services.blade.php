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
    <div class="tab-content" data-controller="PriceBalance--Services" id="myTabContent">
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
                                    {{ $lastModifiedTwulio  }}
                                </span>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                {{ __("Taille du fichier") }}:
                            </th>
                            <th>
                                <span class="ml-3">
                                    {{ $fileSize }}
                                </span>
                            </th>
                        </tr>
                    </table>
                    <hr>
                    <x-rform>
                        <div class="form-group">
                            <label>{{ __('Pays') }}</label>
                            <select class="text-sm w-100" name="iso" data-target="PriceBalance--Services.selectField"
                                style="margin-top: 3px;" data-toggle="select"></select>
                        </div>
                        <button class="btn btn-sm btn-primary" type="submit">
                            {{ __('Recherche') }}
                        </button>
                    </x-rform>

                    <p><small>ISO: {{ request('iso') }}</small></p>

                    <div class="mt-3">
                        @include('template.dump', ['value' => $filter])
                    </div>
                </div>

                <div class="col-lg-6">
                    <form method="POST" data-target="PriceBalance--Services.uploadCsv"
                        action="{{ route('admin.price-balance.services.twilio.upload') }}">
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control" value="{{ $twilioFilename }}"
                                    placeholder="{{ __('Nom de fichier') }}" readonly>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="file" class="form-control" required accept=".csv" name="filecsv"
                                    placeholder="{{ __('Fichier de tarification Twilio') }}" aria-label="pricing file"
                                    aria-describedby="basic-addon1">
                                <div class="input-group-append">
                                    <span class="input-group-text" id="basic-addon2">.csv</span>
                                </div>
                            </div>
                        </div>
                        <button class="btn btn-icon btn-primary btn-sm" type="submit">
                            {{ __('Télécharger') }}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</x-card>
<script type="text/javascript">
    window.ios_country = "{{ request('iso') }}"
</script>
@endsection