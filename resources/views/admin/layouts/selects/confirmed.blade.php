<form action="" method="get" id="select-confirmed">
    <select name="confirmed" onchange="rform(document.getElementById('select-confirmed'))" class="form-control-sm form-control w-auto d-inline-block">
        @foreach ([['confirmed', 'Confirmé'], ['unconfirmed', 'Non Confirmé']] as $item)
        <option value="{{ $item[0] }}" {{ request('confirmed') == $item[0] ? 'selected' : '' }}>{{ __($item[1]) }}
        </option>
        @endforeach
    </select>
</form>