//@ts-check
import { Controller } from "stimulus"
import { FormBtn, Btn, HtmlAlert } from "@/js/functions/dom"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { ApiRequest } from "@/js/api/api"

export default class extends Controller {
    /**
     * @param { Event } e 
     */
    action = (e) => {
        e.preventDefault()
        HtmlAlert.hide()
        Btn.loading(FormBtn(e.target))
        // @ts-ignore
        const url = e.target.dataset.url
        // @ts-ignore
        ApiRequest('post', url ? url : e.target.action, !url ? new FormData(e.target) : {})
            .then((res) => {
                // @ts-ignore
                res.status === 200 &&
                    TurbolinksApp.isc.visit(res.data.redirect_url, { action: 'replace' })
            })
            .catch(error => {
                HtmlAlert.show(this.innerError, error)
                Btn.hide()
            })
    }

    /**
     * @returns { Element }
     */
    get innerError() {
        return this.targets.find('innerError')
    }

}
