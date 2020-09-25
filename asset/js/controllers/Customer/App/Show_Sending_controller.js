//@ts-check
import { Controller } from "stimulus"
import { ApiRequest } from "@/js/api/api"
import { DispachEventGuestDetail, Event_Open_Guest_Socket, Event_Process_Queue } from "@/js/react/vars"

let EchoSocket = null

export default class extends Controller {

    initialize() {
        EchoSocket = null
        ApiRequest('get', this.data.get('statusFetch'))
            .then(({ data: { status } }) => {
                status && this.queueProcess(status)
            })
    }

    connect() {
        window.addEventListener(Event_Process_Queue, this.fromEvent)
        window.addEventListener(Event_Open_Guest_Socket, this.initSocket)
    }

    disconnect() {
        window.removeEventListener(Event_Process_Queue, this.fromEvent)
        window.removeEventListener(Event_Open_Guest_Socket, this.initSocket)
    }

    fromEvent = (e) => {
        const { detail: { status } } = e
        this.queueProcess(status)
    }

    async queueProcess(status) {
        await this.initSocket()
        this.showStatus(status)
    }

    /**
     * @param {{ processed: number, total: number }} status 
     */
    showStatus(status) {
        const p = status.processed || 0
        const t = status.total || 0
        this.show()
        this.setPourcentage((t > 0 ? (p * 100 / t) : 0))
    }


    initSocket = async (e) => {
        if (EchoSocket) return
        const { Echo } = await import('@js/modules/socket')
        EchoSocket = Echo
        // @ts-ignore
        Echo.private("App.User." + window.auth.id)
            .listen('.processed.guest', this.onSocketData.bind(this, e))
    }

    onSocketData = ({ detail }, { status, data }) => {
        detail && this.showStatus(status)
        DispachEventGuestDetail(data)
    }

    setPourcentage(pourcent) {
        const progress = this.element.querySelector('[role="progressbar"]')
        progress.setAttribute('aria-valuenow', pourcent)
        this.targets.find('pourcentage').textContent = pourcent
        // @ts-ignore
        progress.style.width = pourcent + 'px'
    }

    show() {
        const l = this.data.get('showClass')
        if (!this.element.classList.contains(l)) {
            this.element.classList.add(l)
        }

    }

    hide() {
        const l = this.data.get('showClass')
        if (this.element.classList.contains(l)) {
            this.element.classList.remove(l)
        }
    }

}
