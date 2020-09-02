import { Controller } from "stimulus"
import { customerCountryApi } from "@/js/api/services"
import { clientCountry } from "@/js/functions/services"

export default class extends Controller {
    static targets = ['countryCodeBtn']

    connect() {
        this.initSelect2()
    }

    disconnect() {
        this.select && this.select.destroy()
    }

    async initSelect2() {
        this.select = await clientCountry(this.countryCodeBtn, (c) => {
            const code = `+${c.location.calling_code}`
            return [
                { text: ` ---------- `, value: ' ' },
                { text: `<img src="${c.location.country_flag}" style="margin-right:2px" height="12" width="12" /> ${c.country_code} ${code}`, value: code, selected: true }
            ]
        })
        this.select.onChange = (info) => {
            console.log(info.value);
        }
    }

    /**
     * @returns { HTMLElement }
     */
    get countryCodeBtn() {
        return this.countryCodeBtnTarget
    }

}
