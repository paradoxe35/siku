<select class="form-control-sm form-control w-auto d-inline-block p-0" data-controller="Footer"
    data-Footer-locale="{{ route('locale') }}" style="font-size: 0.7rem">
    @foreach ($langs as $lang)
    <option value="{{ $lang['value'] }}" {{ App::getLocale() == $lang['value']  ? 'selected': '' }}>
        {{ $lang['name'] }}</option>
    @endforeach
</select>