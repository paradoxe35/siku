//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = {
        customPaymentValidate: this.data.get('customPaymentValidate'),
        cmpDetails: this.data.get('cmpDetails'),
        paypalReturnUrl: this.data.get('paypalReturnUrl'),
        paypalCancelUrl: this.data.get('paypalCancelUrl'),
        paypalCreatePaypalTransaction: this.data.get('paypalCreatePaypalTransaction'),
        paypalGetPaypalTransaction: this.data.get('paypalGetPaypalTransaction'),
        paypalCancelPaypalTransaction: this.data.get('paypalCancelPaypalTransaction')
    }

    async connect() {
        const { init } = await import('./_Pay/index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
