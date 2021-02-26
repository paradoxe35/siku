import './livewire-datatable/app'
import './livewire-datatable/app.css'
import 'iframe-resizer/js/iframeResizer.contentWindow'

window.routeToParent = (url) => {
    window.parent.dispatchEvent(new CustomEvent('routeFromChild', { detail: url }))
}

window.openParentModal = (data) => {
    window.parent.dispatchEvent(new CustomEvent('openModal', { detail: data }))
}