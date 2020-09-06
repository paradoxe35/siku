//@ts-check
import { Controller } from "stimulus"
import store from "@/js/store"

let subsciption = null
export default class extends Controller {

    initialize() {
        if (subsciption) subsciption()
        this.balanceText()
        subsciption = store.subscribe(this.balanceText)
    }

    balanceText = () => {
        const e = store.getState().customerBalance
        e && (this.showBalance.textContent = e.balance.toString())
    }

    /**
     * @returns { Element }
     */
    get showBalance() {
        return this.targets.find('showBalance')
    }

}
