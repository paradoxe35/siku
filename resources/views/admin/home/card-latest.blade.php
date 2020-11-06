<div class="row">
    <div class="col-xl-8">
        <div class="card">
            <div class="card-header border-0">
                <div class="row align-items-center">
                    <div class="col">
                        <h3 class="mb-0">{{ __('Événements') }}</h3>
                    </div>
                    <div class="col text-right">
                        <a href="#!" class="btn btn-sm btn-primary">{{ __('Voir tout') }}</a>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">{{ __('ID') }}</th>
                            <th scope="col">{{ __('Nom') }}</th>
                            <th scope="col">{{ __('Consommé') }}</th>
                            <th scope="col">{{ __('créé à') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($events as $event)
                        <tr>
                            <th scope="row">{{ $event->hashId() }}</th>
                            <td>{{ $event->name }}</td>
                            <td>{{ $symbol.round($event->totalConsumeds(), 2) }}</td>
                            <td>{{ $event->created_at }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-xl-4">
        <div class="card">
            <div class="card-header border-0">
                <div class="row align-items-center">
                    <div class="col">
                        <h3 class="mb-0">{{ __("Telegram Chat") }}</h3>
                    </div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table align-items-center table-flush">
                    <thead class="thead-light">
                        <tr>
                            <th scope="col">{{ __('Client') }}</th>
                            <th scope="col">{{ __('Telegram U') }}</th>
                            <th scope="col">{{ __('Telegram Chat ID') }}</th>
                            <th scope="col">{{ __('Temps') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($chats as $chat)
                        <tr>
                            <th scope="row">{{ $chat->user->email }}</th>
                            <td>{{ $chat->chat_username }}</td>
                            <td>{{ $chat->chat_id }}</td>
                            <td>{{ $chat->updated_at }}</td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>