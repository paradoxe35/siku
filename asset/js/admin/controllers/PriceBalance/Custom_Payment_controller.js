//@ts-check
import { ApiRequest } from "@/js/api/api"
import { Btn } from "@/js/functions/dom"
import { confirmed } from "@/js/functions/functions"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { Controller } from "stimulus"

export default class extends Controller {
    initialize() {
        this.targets.findAll('action')
            .forEach((e) => e.addEventListener('click', this.action.bind(this, e)))
    }

    /**
     * @param {HTMLButtonElement} element 
     * @param {Event} event 
     */
    action = (element, event) => {
        if (!confirmed()) return

        Btn.loading(element)

        ApiRequest('patch', element.getAttribute('data-url'), {}, true)
            .then(_e => window.setTimeout(() => TurbolinksApp.reload(), 1000))
            .finally(() => Btn.hide())
    }

}
