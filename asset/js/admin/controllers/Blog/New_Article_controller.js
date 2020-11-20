//@ts-check
import { Controller } from "stimulus"
import { convertToHtml } from "@/js/functions/jsonToHtml"
import { confirmed, debounce } from "@/js/functions/functions"
import { ApiRequest } from "@/js/api/api"
import { Btn, FormBtn } from "@/js/functions/dom"
import { Notifier } from "@/js/functions/notifier"
import { Localize } from "@/js/functions/localize"

export default class extends Controller {
    urls = {
        linkEndpoint: this.data.get('linkEndpoint'),
        store: this.data.get('store')
    }

    initialize() {
        this.modalViewer = this.targets.find('modalViewer')
        this.title = this.targets.find('title')

        this.initEditor()
        this.initSelect()

        this.targets.find('store')
            .addEventListener('submit', this.store)

        this.targets.find('storeCategory')
            .addEventListener('submit', this.storeCategory)

        this.targets.find('preview')
            .addEventListener('click', this.preview)

        this.targets.find('categoryBtn')
            .addEventListener('click', this.categoryModal)

        this.deleteCateroryEvent(this.element)
    }

    /**
     * @param { HTMLElement | Element | DocumentFragment } element 
     */
    deleteCateroryEvent(element) {
        Array.from(element.querySelectorAll('[data-category-del]'))
            .forEach((el) => el.addEventListener('click', this.deleteCaterory.bind(this, el)))
    }

    /**
     * @param { HTMLButtonElement } el 
     */
    deleteCaterory = (el) => {
        if (!confirmed()) return
        // @ts-ignore
        const url = this.targets.find('storeCategory').action + '/' + el.getAttribute('data-category-del')
        Btn.loading(el)

        ApiRequest('delete', url, {}, true)
            .then(({ data }) => this.categoriesToHtml(data))
            .finally(() => Btn.hide())
    }

    categoryModal = () => {
        // @ts-ignore
        $(this.targets.find('categoryModal')).modal('show')
    }

    /**
     * @param { Event } e 
     */
    storeCategory = async e => {
        e.preventDefault()

        Btn.loading(FormBtn(e.target))
        // @ts-ignore
        ApiRequest('post', e.target.action, new FormData(e.target), true)
            .then(({ data: { message, datas } }) => {
                Notifier.success(message)
                this.categoriesToHtml(datas)
            })
            .finally(() => Btn.hide())
    }

    /**
     * @param { Array } datas 
     */
    categoriesToHtml(datas) {
        this.slim.setData(
            [
                { id: ' ', name: Localize({ fr: 'Catégories', en: 'Categories' }), value: '' },
                ...datas
            ].map((t, i) => {
                return {
                    selected: !i,
                    value: t.id,
                    text: `${t.name}`
                }
            })
        )
        const htmlText = datas.map((t) => {
            const tr = document.createElement('tr')
            const td1 = document.createElement('td')
            td1.innerHTML = this.withIcon(t.icon)
            const td2 = document.createElement('td')
            td2.innerHTML = t.name
            const td3 = document.createElement('td')
            td3.innerHTML = `
                <button type="button" data-category-del="${t.id}"
                    class="btn btn-secondary btn-sm text-danger active">
                    <i class="ni ni-fat-remove clickable-a text-primary"></i>
                </button>
            `
            tr.appendChild(td1)
            tr.appendChild(td2)
            tr.appendChild(td3)
            return tr
        })

        const parentTable = this.targets.find('categoryList')
        this.removeChildren(parentTable.children)

        htmlText.forEach(el => {
            this.deleteCateroryEvent(el)
            parentTable.appendChild(el)
        })
    }

    withIcon = (icon) => icon ? `<span style="height: 20px; width:20px" class="avatar bg-transparent rounded-circle mr-3">
            ${icon}
    </span>` : ''


    async initSelect() {
        const slim = (await import('@js/utils/SlimSelect')).slim
        this.slim = slim(this.targets.find('categories'))
    }

    async initEditor() {
        const { EditorJS } = await import('@/js/modules/Editor/Editorjs')
        this.editor = EditorJS({ onChange: debounce(this.storeInLocal, 2000, false), }, this.urls.linkEndpoint)

        const dropify = await import('@js/utils/Dropify')
        dropify.Init()

        this.editor.isReady
            .then(() => {
                const fl = this.getDataLocalStore()
                if (fl) {
                    fl.blocks.length && this.editor.render(fl)
                }
            })
    }

    getDataLocalStore() {
        try {
            return JSON.parse(window.localStorage.getItem('editor-json-content'))
        } catch (_) {
            return null
        }
    }

    storeInLocal = async () => {
        const json = await this.editor.save()
        window.localStorage.setItem('editor-json-content', JSON.stringify(json))
    }

    disconnect() {
        this.slim && this.slim.destroy()
    }

    preview = async (e) => {
        const json = await this.editor.save()
        // @ts-ignore
        this.showInModal(json.blocks, this.title.value)
    }

    /**
     * 
     * @param { Event } e 
     */
    store = async (e) => {
        e.preventDefault()
        const { target } = e

        // @ts-ignore
        const datas = new FormData(target)
        const json = await this.editor.save()
        datas.set('json', JSON.stringify(json))

        Btn.loading(FormBtn(target))

        // @ts-ignore
        ApiRequest('post', target.action, datas, true)
            .then(({ data: { message } }) => {
                Notifier.success(message)
                this.editor.clear()
                this.clearInput()
            })
            .finally(() => Btn.hide())
    }

    removeChildren(el) {
        Array.from(el)
            .forEach(element => element.parentNode.removeChild(element))
    }

    /**
     * @param { Array } blocks 
     * @param { string } title
     */
    showInModal(blocks, title) {
        const html = document.createRange().createContextualFragment(convertToHtml(blocks))
        const body = this.modalViewer.querySelector('.modal-body')
        this.modalViewer.querySelector('.modal-title').textContent = title

        this.removeChildren(body.children)

        body.appendChild(html)
        // @ts-ignore
        $(this.modalViewer).modal('show')
    }

    clearInput() {
        this.element.querySelectorAll('input[type="text"]')
            // @ts-ignore
            .forEach(element => element.value = '')
    }

}
