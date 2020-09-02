import { Controller } from "stimulus"
import { customerRequestByEmailJs, customerCountryApi } from "../api/services"
import { Notifier } from "../functions/notifier"
import { customerResquest } from "../api/customer/CustomerRequest"
import { Localize } from "../functions/localize"


export default class extends Controller {
    static targets = ['form']

    connect() {
        this.form.addEventListener('submit', this.handleCustomerRequest)
    }

    disconnect() {
        this.form.removeEventListener('submit', this.handleCustomerRequest)
    }

    /**
     * @param { HTMLElement } target
     * @returns { HTMLButtonElement }
     */
    btn = (target) => target.querySelector('button[type="submit"]')

    /**
     * @param { FormData } form 
     */
    async validateForm(form) {
        return new Promise((resolve) => {
            let e = true
            form.forEach((v) => (v.trim().length < 3) && (e = true))
            resolve(e)
        })
    }

    /**
     * @param { Event } e 
     */
    handleCustomerRequest = async (e) => {
        e.preventDefault()
        const form = new FormData(e.target)
        if (!(await this.validateForm(form))) return
        const btn = this.btn(e.target)
        btn.disabled = true
        customerRequestByEmailJs({
            app_name: form.get('app_name'),
            reply_to: form.get('email'),
            phone_number: form.get('phone'),
            message_html: form.get('message'),
            subject: form.get('subject')
        })
            .then((_) => {
                Notifier.sussess(Localize({
                    fr: 'Votre requête a bien ete envoyée',
                    en: 'Your request has been sent'
                }))
                form.append('sended', "send")
                this.resetFields(form)
                return true
            })
            .catch((_) => {
                Notifier.error(Localize({
                    fr: 'Échec de l\'envoi, veuillez réessayer plus tard',
                    en: 'Failed to send, please try again later'
                }))
                form.append('sended', "fail")
            })
            .finally(() => {
                this.storeRequest(form)
                btn.disabled = false
            })
    }

    /**
     * @param { FormData } form 
     */
    resetFields(form) {
        form.forEach((_, k) => {
            const h = this.element.querySelector(`[name="${k}"]`)
            h && (h.value = '')
        })
    }

    /**
     * @param { FormData } form 
     */
    async storeRequest(form) {
        const countryApi = await customerCountryApi()
        form.append('country_name', countryApi ? countryApi.country_name : null)
        form.append('country_code', countryApi ? countryApi.country_code : null)
        return await customerResquest(this.form.action, form)
    }

    /**
     * @returns { HTMLFormElement }
     */
    get form() {
        return this.formTarget
    }

}
