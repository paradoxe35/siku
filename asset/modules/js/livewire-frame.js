import 'iframe-resizer/js/iframeResizer.contentWindow'
// import 'alpinejs'

window.routeToParent = (url) => {
    window.parent.dispatchEvent(new CustomEvent('routeFromChild', { detail: url }))
}

window.openParentModal = (data) => {
    window.parent.dispatchEvent(new CustomEvent('openModal', { detail: data }))
}