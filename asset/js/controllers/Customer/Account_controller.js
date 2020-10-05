//@ts-check
import { Controller } from "stimulus"
import { Btn, FormBtn, HtmlAlert } from "@/js/functions/dom"
import { ApiRequest } from "@/js/api/api"
import { connectUser } from "@/js/store/features/UserSlice"
import { ReduxDispatch } from "@/js/store"
import { TurbolinksApp } from "@/js/modules/turbolinks"

export default class extends Controller {
    urls = {
        accountUpdatePhone: this.data.get('accountUpdatePhone')
    }

    initialize() {
        this.edit = this.targets.find('editProfile')
        this.phoneNumber = this.targets.find('phoneNumber')
    }

    connect() {
        this.edit.addEventListener('submit', this.editProfile)
        this.phoneNumber.addEventListener('click', this.connectReact)
    }

    disconnect() {
        this.edit && this.edit.removeEventListener('submit', this.editProfile)
        this.react && this.react()
    }

    connectReact = async () => {
        // @ts-ignore
        this.targets.find('spinning').style.display = 'block'
        // @ts-ignore
        this.targets.find('cardContent').style.display = 'none'

        const { init } = await import('./Account/PhoneNumber.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    /**
     * @param { Event } e 
     */
    editProfile = (e) => {
        e.preventDefault()
        HtmlAlert.hide()
        Btn.loading(FormBtn(e.target))
        // @ts-ignore
        const form = new FormData(e.target)

        // @ts-ignore
        ApiRequest('put', e.target.action, form)
            .then(({ data }) => {
                ReduxDispatch(connectUser(data));
                TurbolinksApp.reload()
            })
            .catch(error => {
                HtmlAlert.show(this.targets.find('innerError'), error)
            })
            .finally(() => Btn.hide())
    }

}
