//@ts-check
import { Controller } from "stimulus"
import { TurbolinksApp } from "../modules/turbolinks"
import { setI18nLanguage, ApiRequest } from "../api/api"
import { INprogress } from "../functions/NProgress"
import { ReduxDispatch } from "../store"
import { DESTROY_SESSION } from "../store/action/types"

export default class extends Controller {

    connect() {
        this.element.addEventListener('change', this.changeLocalize)
    }

    /**
     * @param { string } lang 
     */
    async request(lang) {
        INprogress.set()
        ApiRequest('post', this.data.get('locale'), { locale: lang })
            .finally(() => INprogress.unset())
    }
    /**
     * @param { Event } param0 
     */
    // @ts-ignore
    changeLocalize = async ({ target: { value } }) => {
        await this.request(value)
        window.scrollTo({
            top: 0
        })
        ReduxDispatch({ type: DESTROY_SESSION })
        setI18nLanguage(value)
        TurbolinksApp.reload()
    }

    disconnect() {
        this.element.removeEventListener('change', this.changeLocalize)
    }

}
