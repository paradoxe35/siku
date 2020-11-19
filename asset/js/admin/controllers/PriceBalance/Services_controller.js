//@ts-check
import { ApiRequest } from "@/js/api/api"
import { countriesFlagAndEmojis } from "@/js/api/services"
import { Btn, FormBtn } from "@/js/functions/dom"
import { confirmed } from "@/js/functions/functions"
import { Notifier } from "@/js/functions/notifier"
import { clientCountry } from "@/js/functions/services"
import { Controller } from "stimulus"

export default class extends Controller {

    initialize() {
        this.uploadCsv = this.targets.find('uploadCsv')
        this.initSelect()
        this.uploadCsv.addEventListener('submit', this.uploadCsvPrices)
    }

    uploadCsvPrices = (e) => {
        e.preventDefault()
        if (!confirmed()) return
        const { target } = e

        Btn.loading(FormBtn(target))

        ApiRequest('post', target.action, new FormData(target), true)
            .then(({ data }) => {
                Notifier.sussess(data.message)
            })
            .finally(() => Btn.hide())
    }

    async initSelect() {
        this.selectEl = this.targets.find('selectField')
        this.select = await clientCountry(this.selectEl, async (c) => {
            const countries = await countriesFlagAndEmojis()
            return countries.map(country => {
                const sc = c.iso == country.code;
                return {
                    text: `${country.emoji} ${country.name}`,
                    value: country.code,
                    selected: sc
                }
            })
            // @ts-ignore
        }, { iso: window.ios_country })

    }

}
