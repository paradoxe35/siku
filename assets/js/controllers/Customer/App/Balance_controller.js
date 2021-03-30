//@ts-check
import { Controller } from "stimulus"
import store from "@/js/store"

let subsciption = null
export default class extends Controller {

    dbalance = null

    initialize() {
        if (subsciption) subsciption()
        this.balanceText()
        subsciption = store.subscribe(this.balanceText)
    }

    balanceText = () => {
        const e = store.getState().customerBalance
        e && (this.showBalance.textContent = e.balance.toString())
    }

    connect() {
        // @ts-ignore
        const { service, default_balance } = window.customerBalance

        this.dbalanceService.textContent = service && default_balance ? `${service}` : ''
    }

    /**
     * @returns { Element }
     */
    get showBalance() {
        return this.targets.find('showBalance')
    }

    /**
     * @returns { Element }
     */
    get dbalanceService() {
        return this.targets.find('dbalanceService')
    }

}
