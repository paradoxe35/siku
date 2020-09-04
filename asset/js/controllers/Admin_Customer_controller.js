import { Controller } from "stimulus"
import { ReduxDispatch } from '@js/store'
import { connectUser } from "@js/store/features/UserSlice"
import { setCurrentEvent } from "../store/features/EventSlice"

export default class extends Controller {
    initStore = {
        initUserInStore: this.initUserInStore,
        initCurrentEventInStore: this.initCurrentEventInStore
    }

    async initialize() {
        for (const key in this.initStore) {
            if (this[key]) this[key]()
        }
        (await import('@lib/argon/js/argon.js')).connect()
    }

    initUserInStore() {
        if (window.auth)
            ReduxDispatch(connectUser(window.auth));
    }

    initCurrentEventInStore() {
        if (window.customerEvent)
            ReduxDispatch(setCurrentEvent(window.customerEvent));
    }

}
