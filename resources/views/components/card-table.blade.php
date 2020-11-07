<div class="card shadow-sm">
    <div class="card-body">
        <div class="table-responsive">
            <table class="table align-items-center table-hover">
                <thead class="thead-light">
                    <tr>
                        @foreach ($ths as $th)
                        <th scope="col" {{ $sort ? 'class="sort" data-sort="name"' : '' }}>{{ __($th) }}</th>
                        @endforeach
                    </tr>
                </thead>
                <tbody class="list">
                    {{ $slot }}
                </tbody>
            </table>
        </div>
        <div class="mt-3 d-flex justify-content-end">
            {{ $paginate ? $paginate->withQueryString()->links() : '' }}
        </div>
    </div>
</div>