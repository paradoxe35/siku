//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {

    urls = {
        eventTemplates: this.data.get('eventTemplates'),
        eventTemplatesStore: this.data.get('eventTemplatesStore'),
        qrcodeImage: this.data.get('qrcodeImage'),
        setQrlogo: this.data.get('setQrlogo'),
        countryPricing: this.data.get('countryPricing'),
        eventGuests: this.data.get('eventGuests'),
        eventGuestsStore: this.data.get('eventGuestsStore'),
        eventGuestsSendall: this.data.get('eventGuestsSendall'),
    }

    async connect() {
        const { init } = await import('./Product/index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
