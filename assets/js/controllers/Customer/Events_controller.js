//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = {
        events: this.data.get('events'),
        eventStore: this.data.get('eventStore'),
        cmpDetails: this.data.get('cmpDetails'),
        paymentsLinkPage: this.data.get('paymentsLinkPage'),
        customPaymentValidate: this.data.get('customPaymentValidate')
    }

    async connect() {
        const { init } = await import('./Events/Index.jsx')
        this.react = init(this.element, document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
