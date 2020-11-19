<h4 colspan="2" align="center" style="font-size:18px">
    @php
        $path = public_path('img/siku/siku-min.png');
        $type = pathinfo($path, PATHINFO_EXTENSION);
        $data = file_get_contents($path);
        $base64 = 'data:image/' . $type . ';base64,' . base64_encode($data);
        echo '<img src="'.$base64.'" height="100" width="100">';
    @endphp
    <br />
   <b>{{ __($title)  }}</b>
</h4>