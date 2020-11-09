<form action="" method="get" id="select-active">
    <select name="active" onchange="rform(document.getElementById('select-active'))"
        class="form-control-sm form-control w-auto d-inline-block">
        @foreach ([['active', 'Actifs'], ['deleted', 'Supprimés'], ['all', 'Tout']] as $item)
        <option value="{{ $item[0] }}" {{ request('active') == $item[0] ? 'selected' : '' }}>{{ __($item[1]) }}
        </option>
        @endforeach
    </select>
</form>