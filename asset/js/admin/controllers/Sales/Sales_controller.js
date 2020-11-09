//@ts-check
import { ApiRequest } from "@/js/api/api"
import { Btn } from "@/js/functions/dom"
import { confirmed } from "@/js/functions/functions"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { Controller } from "stimulus"

export default class extends Controller {

    initialize() {
        this.updateEl = this.targets.find('update')
        this.updateEl && this.showPage()
    }

    showPage() {
        this.deleteEl = this.targets.find('delete')
        this.url = this.updateEl.getAttribute('data-url')
        this.confirmed = this.targets.find('confirmed')
        this.updateEl.addEventListener('click', this.update)
        this.deleteEl.addEventListener('click', this.delete)
    }

    update = () => {
        // @ts-ignore
        Btn.loading(this.updateEl)
        /** @type { HTMLInputElement } */
        // @ts-ignore
        const confirmed = this.confirmed

        ApiRequest('patch', this.url, { ...(confirmed.checked ? { confirmed: true } : {}) }, true)
            .then(({ data: { redirect_url } }) => {
                TurbolinksApp.visit(redirect_url)
            })
            .finally(() => Btn.hide())
    }

    delete = () => {
        if (!confirmed()) return
        // @ts-ignore
        Btn.loading(this.deleteEl)
        ApiRequest('delete', this.url, {}, true)
            .then(({ data: { redirect_url } }) => {
                TurbolinksApp.replace(redirect_url)
            })
            .finally(() => Btn.hide())
    }
}
