//@ts-check
import { Controller } from "stimulus"
import { clientCountry } from "@/js/functions/services"
import { FormBtn, HtmlAlert, Btn } from "@/js/functions/dom"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { ApiRequest } from "@/js/api/api"

export default class extends Controller {
    calling_code = null
    country = {
        name: null,
        code: null
    }

    connect() {
        this.initSelect2()
    }

    disconnect() {
        this.select && this.select.destroy()
    }

    /**
     * @returns { string }
     */
    get phone() {
        // @ts-ignore
        return this.targets.find('phone').value;
    }

    /**
     * @returns { string }
     */
    formatPhone() {
        if (!this.calling_code || this.phone.includes(this.calling_code))
            return this.phone;
        return this.calling_code + this.phone
    }
    /**
     * @param { Event } e 
     */
    register = (e) => {
        e.preventDefault()
        HtmlAlert.hide()
        Btn.loading(FormBtn(e.target))
        // @ts-ignore
        const form = new FormData(e.target)
        form.set('phone', this.formatPhone())
        form.set('country_name', this.country.name)
        form.set('country_code', this.country.code)
        // @ts-ignore
        ApiRequest('post', e.target.action, form)
            .then((res) => {
                // @ts-ignore
                res.status === 200 &&
                    TurbolinksApp.isc.visit(res.data.redirect_url, { action: 'replace' })
            })
            .catch(error => {
                HtmlAlert.show(this.innerError, error)
            })
            .finally(() => Btn.hide())
    }

    async initSelect2() {
        // @ts-ignore
        this.select = await clientCountry(this.countryCodeBtn, (c) => {
            const code = `${c.location.calling_code}`
            this.calling_code = code
            this.country = {
                name: c.country_name,
                code: c.country_code
            }
            return [
                { text: ` ---------- `, value: ' ' },
                { text: `<img src="${c.location.country_flag}" style="margin-right:2px" height="12" width="12" /> ${c.country_code} +${code}`, value: code, selected: true }
            ]
        })
        this.select.onChange = (info) => {
            this.calling_code = info.value
        }
    }

    /**
     * @returns { Element }
     */
    get innerError() {
        return this.targets.find('innerError')
    }

    /**
     * @returns { Element }
     */
    get countryCodeBtn() {
        return this.targets.find('countryCodeBtn')
    }

}
