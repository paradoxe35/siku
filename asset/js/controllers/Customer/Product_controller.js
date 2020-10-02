//@ts-check
import { Controller } from "stimulus"
import store, { ReduxDispatch } from '@js/store'
import { setEventStatus } from "@/js/store/features/product/EventStatusSlice.js"

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
        eventMenuProfile: this.data.get('eventMenuProfile'),
        eventProfileItems: this.data.get('eventProfileItems'),
    }

    initialize() {
        this.initEventStatusInStore()
        this.eventStatusText()
        this.unsubscribe = store.subscribe(this.eventStatusText)
    }

    /**
     * @param { Array } keys 
     * @param {*} state 
     */
    toText(keys, state) {
        keys.forEach(k => {
            const h = this.targets.find(k)
            h && (h.textContent = state[k])
        })
    }

    eventStatusText = () => {
        const status = store.getState().EventStatus
        const payload = status.payload
        if (payload) {
            this.toText(Object.keys(payload), payload)
        } else {
            this.toText(Object.keys(status), status)
        }
    }


    async connect() {
        const { init } = await import('./Product/index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
        this.unsubscribe && this.unsubscribe()
    }


    initEventStatusInStore() {
        // @ts-ignore
        const o = window.EventStatus
        ReduxDispatch(setEventStatus(o));
    }
}
