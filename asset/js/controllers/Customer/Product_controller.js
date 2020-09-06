//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {

    urls = {}

    async connect() {
        const { init } = await import('./Product/index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
