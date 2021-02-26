<div class="text-center" id="spinner-frame">
    <x-spinning-dots />
</div>

<iframe style="width: 100%;" id="livewire-frame-datatable" scrolling="no"
    src="{{ route('livewire', array_merge($attributes->getAttributes(), ['component' => $ref]), false) }}"
    frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen
    onload="var t = this;if(window.resizeIframe){resizeIframe(t)}else{window.onload=function(){resizeIframe(t)}};var g = document.getElementById('spinner-frame');g && g.remove()"></iframe>