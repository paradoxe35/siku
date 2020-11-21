//@ts-check
import { ApiRequest } from "@/js/api/api"
import { Btn } from "@/js/functions/dom"
import { confirmed } from "@/js/functions/functions"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { Controller } from "stimulus"

export default class extends Controller {

    initialize() {
        this.btn = this.targets.find('deleteBtn')
        this.url = this.btn.getAttribute('data-url')
    }

    trash = e => {
        if (!confirmed()) return
        // @ts-ignore
        Btn.loading(this.btn)

        ApiRequest('patch', this.url, {}, true)
            .then(() => TurbolinksApp.reload())
            .finally(() => Btn.hide())
    }

    destroy = e => {
        if (!confirmed()) return
        // @ts-ignore
        Btn.loading(this.btn)

        ApiRequest('delete', this.url, {}, true)
            .then(({ data: { redirect_url } }) => TurbolinksApp.replace(redirect_url))
            .finally(() => Btn.hide())
    }


}
