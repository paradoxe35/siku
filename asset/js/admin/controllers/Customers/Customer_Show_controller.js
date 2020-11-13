//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = {
        update: this.data.get('update'),
        events: this.data.get('events'),
        purchases: this.data.get('purchases'),
        historyLowBalance: this.data.get('lowBalance')
    }

    async connect() {
        const { init } = await import('./show/Index.jsx')
        this.react = init(this.element, document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
