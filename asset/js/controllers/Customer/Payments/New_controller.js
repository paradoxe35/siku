//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = {
        countryPricing: this.data.get('countryPricing'),
        payData: this.data.get('payData'),
    }

    async connect() {
        const { init } = await import('./_New/index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
