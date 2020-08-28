import { Controller } from "stimulus"

export default class extends Controller {

    initialize() {
        this.urls = {}
    }

    async connect() {
        const { init } = await import('./Config/Index.jsx')
        this.react = init(this.element, document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }

}
