//@ts-check
import { Controller } from "stimulus"

export default class extends Controller {

    urls = {
        accountUpdate: this.data.get('accountUpdate'),
        accountUpdatePassword: this.data.get('accountUpdatePassword'),
        adminsIndex: this.data.get('adminsIndex'),
        adminsStore: this.data.get('adminsStore'),
        agentsIndex: this.data.get('agentsIndex'),
        agentsStore: this.data.get('agentsStore'),
        cmpDetailsStore: this.data.get('cmpDetailsStore'),
        cmpDetailsIndex: this.data.get('cmpDetailsIndex'),
    }

    async connect() {
        const { init } = await import('./Index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
    }
}
