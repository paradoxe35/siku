import { Controller } from "stimulus"
import { SwupApp } from "@js/functions/Swup"
import { ChangeLocale } from "@js/api/Locale"

export default class extends Controller {

    connect() {
        this.element.addEventListener('change', this.changeLocalize)
    }

    /**
     * @param { Event } param0 
     */
    changeLocalize = async ({ target: { value } }) => {
        await ChangeLocale(this.data.get('locale'), value)
        window.scrollTo({
            top: 0
        })
        SwupApp.swup.loadPage({
            url: window.location.pathname + window.location.search
        }, true)
    }

    disconnect() {
        this.element.removeEventListener('change', this.changeLocalize)
    }

}
