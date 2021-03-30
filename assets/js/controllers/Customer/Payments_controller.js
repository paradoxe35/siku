//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {
    urls = { 
        historyIndex: this.data.get('historyIndex'),
        historyLowBalance: this.data.get('historyLowBalance'),
    }

    async connect() {
        const { init } = await import('./Payments/index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
