//@ts-check
import { Controller } from "stimulus"
import { clientCountry } from "@/js/functions/services"
import { FormBtn, HtmlAlert, Btn } from "@/js/functions/dom"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { ApiRequest } from "@/js/api/api"
import { Localize } from "@/js/functions/localize"

export default class extends Controller {
    calling_code = null
    country = {
        name: null,
        code: null
    }


    connect() {
        this.initSelect2()
        this.initPhoneParser()
    }

    async initPhoneParser() {
        const { parsePhoneNumber, isValidPhoneNumber } = await import("react-phone-number-input")
        this.parsePhoneNumber = parsePhoneNumber
        this.isValidPhoneNumber = isValidPhoneNumber
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
        const phone = (this.calling_code + this.phone).trim()
        return phone[0] === '+' ? phone : '+' + phone
    }

    validatePhoneNumber(phone) {
        if (this.isValidPhoneNumber) {
            const isValid = this.isValidPhoneNumber(phone)
            if (!isValid) return false
            const parsed = this.parsePhoneNumber(phone)
            const lastCode = this.country.code
            this.country = {
                code: parsed.country,
                name: lastCode == parsed.country ? this.country.name : parsed.country
            }
            return parsed.number
        }
        return phone
    }

    /**
     * @param { Event } e 
     */
    register = (e) => {
        e.preventDefault()
        let phone = this.validatePhoneNumber(this.formatPhone())
        if (!phone) {
            HtmlAlert.show(this.innerError, [Localize({
                fr: 'Votre numéro de téléphone est incorrect',
                en: 'Your phone number is incorrect'
            })])
            return
        }
        HtmlAlert.hide()
        Btn.loading(FormBtn(e.target))
        // @ts-ignore
        const form = new FormData(e.target)
        form.set('phone', phone)
        form.set('country_name', this.country.name)
        form.set('country_code', this.country.code)
        // @ts-ignore
        ApiRequest('post', e.target.action, form, false, 419)
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
                { text: Localize({ fr: 'Autre pays', en: 'Other country' }), value: ' ' },
                {
                    text: `<img src="${c.location.country_flag}" style="margin-right:2px" height="12" width="12" /> ${c.country_code} +${code}`,
                    value: code,
                    selected: true
                }
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
