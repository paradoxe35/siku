//@ts-check
import { TurbolinksApp } from "@js/modules/turbolinks"
import { setI18nLanguage, ApiRequest } from "@js/api/api"
import { INprogress } from "@js/functions/NProgress"
import { ReduxDispatch } from "@js/store"
import { DESTROY_SESSION } from "@js/store/action/types"


export const FooterMixin = {
    initialize() {
        this.changeLocalize = this.changeLocalize.bind(this)
    },
    
    connect() {
        this.element.addEventListener('change', this.changeLocalize)
    },
    /**
     * @param { string } lang 
     */
    async request(lang) {
        INprogress.set()
        ApiRequest('post', this.data.get('locale'), { locale: lang })
            .finally(() => INprogress.unset())
    },
    /**
     * @param { Event } param0 
     */
    // @ts-ignore
    async changeLocalize({ target: { value } }) {
        // @ts-ignore
        await this.request(value)
        window.scrollTo({
            top: 0
        })
        ReduxDispatch({ type: DESTROY_SESSION })
        setI18nLanguage(value)
        TurbolinksApp.reload()
    },

    disconnect() {
        this.element.removeEventListener('change', this.changeLocalize)
    }
}