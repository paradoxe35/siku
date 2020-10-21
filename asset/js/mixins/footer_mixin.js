//@ts-check
import { setI18nLanguage, ApiRequest } from "@js/api/api"
import { INprogress } from "@js/functions/NProgress"


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
        try {
            await ApiRequest('post', this.data.get('locale'), { locale: lang })
        } catch (e) { }
        INprogress.unset()
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
        setI18nLanguage(value)
        window.location.reload()
    },

    disconnect() {
        this.element.removeEventListener('change', this.changeLocalize)
    }
}