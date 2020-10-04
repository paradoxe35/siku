//@ts-check
import { Controller } from "stimulus"
import { ApiRequest } from "@/js/api/api.js"
import { Localize } from "@/js/functions/localize.js"
import { setCurrentEvent } from "@/js/store/features/EventSlice.js"
import { ReduxDispatch } from "@/js/store/index.js"
import { DESTROY_SESSION } from "@/js/store/action/types.js"
import { TurbolinksApp } from "@/js/modules/turbolinks.js"

export default class extends Controller {
    urls = {
        eventUpdate: this.data.get('eventUpdate'),
        eventSettingsRoute: this.data.get('eventSettingsRoute')
    }

    initialize() {
        this.modify = this.targets.find('modify')
        this.deactivate = this.targets.find('deactivate')
        this.delete = this.targets.find('delete')
    }

    connect() {
        this.modify.addEventListener('click', this.connectReact)
        this.deactivate.addEventListener('click', this.deactivateEvent)
        this.delete.addEventListener('click', this.deleteEvent)
    }


    /**
     * @param {*} el 
     * @returns { HTMLElement }
     */
    el = (el) => el

    /**
     * @param {HTMLElement} el 
     * @param {boolean} st 
     */
    statusEvent(el, st) {
        if (st) {
            el.innerHTML = Localize({
                fr: 'Désactiver',
                en: 'Deactivate'
            })
            el.classList.replace('text-primary', 'text-danger')
        } else {
            el.innerHTML = Localize({
                fr: 'Activer',
                en: 'activate'
            })
            el.classList.replace('text-danger', 'text-primary')
        }
    }

    /**
     * @param {Event} param0 
     */
    deactivateEvent = ({ }) => {
        const el = this.el(this.deactivate)
        ApiRequest('patch', this.urls.eventUpdate, {}, true)
            .then(({ data: { data } }) => {
                ReduxDispatch(setCurrentEvent(data));
                this.statusEvent(el, data.active)
            })
    }

    /**
     * @param {Event} param0 
     */
    deleteEvent = ({ }) => {
        if (!confirm(Localize({
            fr: 'Êtes-vous sûr ?',
            en: 'Are you sure ?',
        }))) return;

        const el = this.el(this.delete)
        ApiRequest('delete', el.getAttribute('data-url'), {}, true)
            .then((_) => {
                ReduxDispatch({ type: DESTROY_SESSION });
                TurbolinksApp.isc.visit(el.getAttribute('data-redirect'), { action: 'replace' })
            })
    }

    connectReact = async () => {
        this.modify.remove()
        // @ts-ignore
        this.targets.find('spinning').style.display = 'block'
        // @ts-ignore
        this.targets.find('cardContent').style.display = 'none'

        const { init } = await import('./Settings/Index.jsx')
        this.react = init(this.targets.find('content'), document.querySelector('html').lang, this.urls)
    }

    disconnect() {
        this.react && this.react()
        this.deactivate && this.deactivate.removeEventListener('click', this.deactivateEvent)
        this.delete && this.delete.removeEventListener('click', this.deleteEvent)
    }
}
