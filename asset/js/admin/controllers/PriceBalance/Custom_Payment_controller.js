//@ts-check
import { ApiRequest } from "@/js/api/api"
import { Btn, FormBtn, innerDump } from "@/js/functions/dom"
import { confirmed, debounce } from "@/js/functions/functions"
import { Localize } from "@/js/functions/localize"
import { Notifier } from "@/js/functions/notifier"
import { TurbolinksApp } from "@/js/modules/turbolinks"
import { Controller } from "stimulus"

export default class extends Controller {
    clients = {}

    initialize() {
        this.targets.findAll('action')
            .forEach((e) => e.addEventListener('click', this.action.bind(this, e)))
        this.targets.find('store')
            .addEventListener('submit', this.store)
        this.initSelect()
    }

    /**
     * @param {HTMLButtonElement} element 
     */
    action = (element) => {
        if (!confirmed()) return

        Btn.loading(element)

        ApiRequest('patch', element.getAttribute('data-url'), {}, true)
            .then(_e => window.setTimeout(() => TurbolinksApp.reload(), 1000))
            .finally(() => Btn.hide())
    }

    async initSelect() {
        this.selectEl = this.targets.find('selectField')
        const slim = (await import('@js/utils/SlimSelect')).slim
        // @ts-ignore
        this.slim = slim(this.selectEl, {
            searchingText: Localize({ fr: 'Recherche', en: 'Searching' }) + '...',
            ajax: debounce(this.searchClientAjax, 500, false)
        })

        this.slim.onChange = (info) => {
            innerDump(this.targets.find('clientPay'), this.clients[info.value].html)
        }
    }

    searchClientAjax = (search, callback) => {
        if (search.length < 2) {
            callback(Localize({ en: 'Need 2 characters min', fr: 'Besoin de 2 caractères min' }))
            return
        }

        ApiRequest('get', this.selectEl.getAttribute('data-search-url') + '?search=' + search, {}, true)
            .then(({ data }) => {
                const datas = []
                this.clients = {}
                data.forEach((client) => {
                    datas.push({ text: `${client.email} - ${client.hash}`, value: client.id })
                    this.clients[client.id] = client
                })
                callback(datas)
            })
            .catch(() => callback(false))
    }

    /**
     * @param { Event } e 
     */
    store = (e) => {
        e.preventDefault()
        if (!confirmed()) return

        /** @type { * } */
        const { target } = e

        const client = this.clients[this.slim.selected()]

        if (!client || !client.pay_data) {
            Notifier.error(Localize({
                fr: 'Les détails de paiement sont incorrects',
                en: 'Payment details are incorrect'
            }))
            return
        }

        const form = new FormData(target)
        Btn.loading(FormBtn(target))

        form.set('client_id', client ? client.id : '')
        form.set('guests', client ? client.pay_data.guests : '')
        form.set('amount', client ? client.pay_data.price : '')

        ApiRequest('post', target.action, form, true)
            .then(({ data }) => {
                Notifier.success(data.message)
                    .then(() => TurbolinksApp.reload())
            })
            .finally(() => Btn.hide())
    }

}
