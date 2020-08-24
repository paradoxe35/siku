import { Controller } from "stimulus"
import Axios from "axios"

export default class extends Controller {
    static targets = ['countryCodeBtn']

    initialize() {
        this.initSelect2()
    }

    async initSelect2() {
        const { slim } = await import('@/js/utils/SlimSelect')
        const select = slim(this.countryCodeBtn, {
            placeholder: '...'
        })
        const c = await this.customerCountryApi()
        if (c) {
            const code = `+${c.location.calling_code}`
            select.setData([
                { text: ` ---------- `, value: ' ' },
                { text: `<img src="${c.location.country_flag}" style="margin-right:2px" height="12" width="12" /> ${c.country_code} ${code}`, value: code, selected: true }
            ])
        }
        select.onChange = (info) => {
            console.log(info);
        }
    }

    async customerCountryApi() {
        try {
            const { data } = await Axios.get("http://api.ipstack.com/check?access_key=6de6ff2313c40db8eff256ee23500973&format=1")
            return data;
        } catch (_) {
            return null
        }
    }

    get countryCodeBtn() {
        return this.countryCodeBtnTarget
    }

}
