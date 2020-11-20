//@ts-check
import { ApiRequest } from "@/js/api/api";
import { Btn, FormBtn } from "@/js/functions/dom";
import { confirmed } from "@/js/functions/functions";
import { Notifier } from "@/js/functions/notifier";
import { TurbolinksApp } from "@/js/modules/turbolinks";
import { Controller } from "stimulus"

export default class extends Controller {

    initialize() {
        const form = this.targets.find('form')
        // @ts-ignore
        this.url = form.action;
        form.addEventListener('submit', this.setBalances)
        const clearEl = this.targets.find('clear')
        clearEl.addEventListener('click', this.clearBalance.bind(this, clearEl))
    }

    /**
     * @param { Event } e 
     */
    setBalances = e => {
        e.preventDefault()

        Btn.loading(FormBtn(e.target))
        // @ts-ignore
        const form = new FormData(e.target)

        ApiRequest('post', this.url, form, true)
            .then(({ data: { message } }) => {
                Notifier.success(message)
            })
            .finally(() => Btn.hide())
    }

    /**
    * @param { HTMLButtonElement } btn 
    */
    clearBalance = btn => {
        if (!confirmed()) return

        Btn.loading(btn)
        ApiRequest('delete', this.url, {}, true)
            .then(({ data: { message } }) => {
                Notifier.success(message, 3000)
                    .then(() => TurbolinksApp.reload())
            })
            .finally(() => Btn.hide())
    }

}
