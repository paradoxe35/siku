import { TurbolinksApp } from "../modules/turbolinks";
import { openModal } from "./dom";

Number.prototype.nround = function (places) {
    return +(Math.round(this + "e+" + places) + "e-" + places);
}

window.rform = (form) => {
    const searchForm = new URLSearchParams(new FormData(form))
    const csearch = new URLSearchParams(window.location.search)
    csearch.forEach((v, k) => {
        if (!searchForm.has(k)) {
            searchForm.set(k, v)
        }
    })
    const { origin, pathname } = window.location
    TurbolinksApp.replace(origin + pathname + '?' + searchForm.toString())
}

window.tvisit = (link) => {
    TurbolinksApp.visit(link)
}

window.resizeIframe = async (obj) => {
    const f = await import('iframe-resizer')
    f.iframeResizer({}, obj)
}

(() => {
    window.addEventListener('routeFromChild', (e) => {
        TurbolinksApp.visit(e.detail)
    })

    window.addEventListener('openModal', (e) => openModal(atob(e.detail)))
})()