//@ts-check
import { Controller } from "stimulus"
import { HtmlAlert, Btn, FormBtn } from "@/js/functions/dom"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { ApiRequest } from "@/js/api/api"
import { Localize } from "@/js/functions/localize"
import { Notifier } from "@/js/functions/notifier"

export default class extends Controller {

    initialize() {
        this.edit = this.targets.find('editPassword')
    }

    connect() {
        this.edit.addEventListener('submit', this.editPassword)
    }

    disconnect() {
        this.edit && this.edit.removeEventListener('submit', this.editPassword)
    }


    /**
     * @param { Event } e 
     */
    editPassword = (e) => {
        e.preventDefault()
        HtmlAlert.hide()
        Btn.loading(FormBtn(e.target))
        // @ts-ignore
        const form = new FormData(e.target)

        // @ts-ignore
        ApiRequest('put', e.target.action, form)
            .then((_) => {
                Notifier.success(Localize({
                    fr: 'Modifications enregistrées',
                    en: 'Saved changes'
                }))
                window.setTimeout(() => {
                    TurbolinksApp.replace(this.data.get('accountRoute'))
                }, 3000)
            })
            .catch(error => {
                HtmlAlert.show(this.targets.find('innerError'), error)
            })
            .finally(() => Btn.hide())
    }
}
