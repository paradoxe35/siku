//@ts-check
import { ApiRequest } from "@/js/api/api";
import { Btn, FormBtn } from "@/js/functions/dom";
import { Notifier } from "@/js/functions/notifier";
import { Controller } from "stimulus"

export default class extends Controller {

    initialize() {
        const form = this.targets.find('form')
        // @ts-ignore
        this.url = form.action;
        form.addEventListener('submit', this.setBalances)
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

}
