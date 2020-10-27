//@ts-check
import { Controller } from "stimulus"
import { ApiRequest } from "@/js/api/api"
import { DispachEventGuestDetail, DispachLoadedSocketLibDetail, Event_Open_Guest_Socket, Event_Process_Queue } from "@/js/react/vars"
import { ReduxDispatch } from "@/js/store"
import { putEventStatus } from "@/js/store/features/product/EventStatusSlice"
import { setBalanceAmount } from "@/js/store/features/BalanceSlice"

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
        window.addEventListener(Event_Process_Queue, this.fromProcessQueueEvent)
        window.addEventListener(Event_Open_Guest_Socket, this.initSocket)
    }

    disconnect() {
        window.removeEventListener(Event_Process_Queue, this.fromProcessQueueEvent)
        window.removeEventListener(Event_Open_Guest_Socket, this.initSocket)
    }

    fromProcessQueueEvent = (e) => {
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
        const prt = (t > 0 ? (p * 100 / t) : 0);
        this.setPourcentage(Math.floor(prt))
        if (prt >= 100) {
            this.successProgress()
            window.setTimeout(() => {
                this.hide()
            }, 7000)
        }
    }

    loadedSocketLib() {
        window.setTimeout(() => {
            DispachLoadedSocketLibDetail()
        }, 500)
    }

    initSocket = async (e) => {
        if (EchoSocket) {
            this.loadedSocketLib()
            return
        }
        const { UserChannel } = await import('@js/modules/socket')
        EchoSocket = UserChannel()
        this.loadedSocketLib()
        EchoSocket.listen('.processed.guest', this.onSocketData.bind(this, e))
    }

    dispatchToAppState({ processed, consumed }) {
        ReduxDispatch(putEventStatus({
            used_amount: consumed,
            sended: processed
        }))
    }

    onSocketData = (e, { status, data, new_balance }) => {
        !e && this.showStatus(status)
        status && this.dispatchToAppState(status)
        data && DispachEventGuestDetail(data)
        data && ReduxDispatch(setBalanceAmount(new_balance))
    }

    setPourcentage(pourcent) {
        const progress = this.progress
        progress.setAttribute('aria-valuenow', pourcent)
        this.targets.find('pourcentage').textContent = pourcent
        // @ts-ignore
        progress.style.width = pourcent + '%'
    }

    successProgress() {
        this.progress.classList.replace('bg-default', 'bg-success')
    }

    show() {
        this.progress.classList.replace('bg-success', 'bg-default')
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

    get progress() {
        return this.targets.find('progress')
    }

}
