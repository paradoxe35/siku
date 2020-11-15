//@ts-check
import { Controller } from "stimulus"
import { Btn, FormBtn, HtmlAlert } from "@/js/functions/dom"
import { ApiRequest } from "@/js/api/api"
import { connectUser } from "@/js/store/features/UserSlice"
import { ReduxDispatch } from "@/js/store"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { clientCountry, initSelect2 } from "@/js/functions/services.js"
import { countriesFlagAndEmojis } from "@/js/api/services.js"

export default class extends Controller {
    urls = {
        accountUpdatePhone: this.data.get('accountUpdatePhone')
    }


    initialize() {
        // @ts-ignore
        const { country_code, country_name } = window.auth
        this.country = {
            name: country_code,
            code: country_name
        }
        this.edit = this.targets.find('editProfile')
        this.phoneNumber = this.targets.find('phoneNumber')
    }

    connect() {
        this.initSelect2()
        this.edit.addEventListener('submit', this.editProfile)
        this.phoneNumber.addEventListener('click', this.connectReact)
    }

    connectedCountry = (c) => {
        this.country = {
            name: c.name,
            code: c.code
        }
    }


    async initSelect2() {
        this.select = await initSelect2(
            this.targets.find('countrySelectField'),
            this.connectedCountry,
            // @ts-ignore
            window.auth
        )
    }

    disconnect() {
        this.select && this.select.destroy()
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
        form.append('country_code', this.country.code)
        form.append('country_name', this.country.name)
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
