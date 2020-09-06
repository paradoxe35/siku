import { Controller } from "stimulus"
import store, { ReduxDispatch } from '@js/store'
import { connectUser } from "@js/store/features/UserSlice"
import { setCurrentEvent } from "../store/features/EventSlice"
import { setBalance } from "../store/features/BalanceSlice"

export default class extends Controller {
    initStore = {
        initUserInStore: this.initUserInStore,
        initCurrentEventInStore: this.initCurrentEventInStore,
        initCustomerBalanceInStore: this.initCustomerBalanceInStore
    }

    async initialize() {
        for (const key in this.initStore) {
            if (this[key]) this[key]()
        }
        (await import('@lib/argon/js/argon.js')).connect()
    }

    initUserInStore() {
        const o = store.getState().userAuth
        const user = window.auth
        if (this.mustDispache(user, o))
            ReduxDispatch(connectUser(user));
    }

    initCurrentEventInStore() {
        const o = store.getState().workingEvent
        const event = window.customerEvent
        if (this.mustDispache(event, o))
            ReduxDispatch(setCurrentEvent(event));
    }

    initCustomerBalanceInStore() {
        const { balance } = store.getState().customerBalance
        const data = window.customerBalance
        if (data && balance !== data.balance || !data)
            ReduxDispatch(setBalance(data));
    }

    mustDispache(p, s) {
        if ((p && s && p.id !== s.id) || (p && !s))
            return true;
        return false;
    }

}
