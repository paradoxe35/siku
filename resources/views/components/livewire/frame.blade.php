<iframe style="width: 100%;" id="{{ Str::random(20) }}" scrolling="no"
    src="{{ route('livewire', array_merge($attributes->getAttributes(), ['component' => $ref]), false) }}"
    frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen
    onload="var t = this; if(resizeIframe){resizeIframe(t)}else{window.onload=function(){resizeIframe(t)}}"></iframe>