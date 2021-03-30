//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = {
        eventValidators: this.data.get('eventValidators'),
        eventValidatorsStore: this.data.get('eventValidatorsStore'),
    }

    async connect() {
        const { init } = await import('./Utilization/Index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }
}
