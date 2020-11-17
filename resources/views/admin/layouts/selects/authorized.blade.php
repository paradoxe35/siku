<form action="" method="get" id="select-authorized">
    <select name="authorized" onchange="rform(document.getElementById('select-authorized'))"
        class="form-control-sm form-control w-auto d-inline-block">
        @foreach ([['authorized', 'Autorisé'], ['unauthorized', 'Non Autorisé']] as $item)
        <option value="{{ $item[0] }}" {{ request('authorized') == $item[0] ? 'selected' : '' }}>{{ __($item[1]) }}
        </option>
        @endforeach
    </select>
</form>