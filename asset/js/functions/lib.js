import { TurbolinksApp } from "../modules/turbolinks";

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