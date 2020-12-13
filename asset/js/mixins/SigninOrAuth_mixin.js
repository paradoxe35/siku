//@ts-check
import { FormBtn, Btn, HtmlAlert } from "@/js/functions/dom"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { ApiRequest } from "@/js/api/api"
import { ReduxDispatch } from "@/js/store"
import { DESTROY_SESSION } from "@/js/store/action/types"


export const SigninOrAuthMixin = {
    initialize() {
        this.action = this.action.bind(this)
    },
    logout(error = null) {
        const type = this.data.get('type')
        if (type !== 'logout') return
        ReduxDispatch({ type: DESTROY_SESSION })
        error && window.location.reload()
    },
    /**
     * @param { Event } e 
     */
    action(e) {
        e.preventDefault()
        HtmlAlert.hide()
        Btn.loading(FormBtn(e.target))

        // @ts-ignore
        const url = e.target.dataset.url
        // @ts-ignore
        ApiRequest('post', url ? url : e.target.action, !url ? new FormData(e.target) : {}, false, 419)
            .then(({ status, data }) => {
                if (status === 200) {
                    TurbolinksApp.isc.visit(this.getUrl(data.redirect_url), { action: 'replace' })
                }
                this.logout()
            })
            .catch(error => {
                HtmlAlert.show(this.innerError(), error)
                this.logout('error')
            })
            .finally(() => Btn.hide())
    },
    getUrl(url) {
        let u = null
        try {
            const p = new URL(url)
            u = p.pathname + p.search;
        } catch (_) {
            u = url
        }
        return u
    },
    /**
     * @returns { Element }
     */
    innerError() {
        return this.targets.find('innerError')
    }
}