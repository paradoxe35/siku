//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = {
        customPaymentValidate: this.data.get('customPaymentValidate'),
        cmpDetails: this.data.get('cmpDetails'),
        countryPricing: this.data.get('countryPricing')
    }

    async connect() {
        const { init } = await import('./New/index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
