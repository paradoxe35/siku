// @ts-check
import { Localize } from "./localize"

/**
 * @param { HTMLElement | Element } parent 
 */
export const removeChilds = (parent) => {
    Array.from(parent.children)
        .forEach(element => element.parentNode.removeChild(element))
}

export const HtmlAlert = {
    parents: [],
    /**
     * @param { HTMLElement| Element } parent 
     * @param { ObjectConstructor | string } message
     * @param { boolean } showIcon 
     * @param { string } icon 
     * @param { string } type 
     */
    show(parent, message, showIcon = true, icon = 'fat-remove', type = 'danger') {
        const content = `
            <div class="callout alert alert-dismissible fade show border flex-column flex-md-row p-2 p-md-4 border-darken-1 border-${type}" role="alert">
                ${showIcon ? `
                    <span class="alert-icon text-${type}"><i class="ni ni-${icon}"></i></span>
                `: ''}
                <div>
                    <span class="alert-text">
                        ${this.message(message)}
                    </span>
                </div>
            </div>
        `
        if (parent) {
            this.parents.push(parent)
            parent.innerHTML = content
        }
        return content
    },
    message(message) {
        if (message !== null || message !== undefined) {
            if (typeof message === 'string')
                return message;
            if (message.constructor == Array)
                return this.fromArray(message);
            if (message.message && !message.errors)
                return message.message;
            if (message.message && message.errors)
                return this.fromObject(message.errors)
        } else {
            return Localize({
                fr: 'Une erreur est survenue en interne, veuillez réessayer plus tard',
                en: 'An error has occurred internally, please try again later'
            })
        }
    },
    hide() {
        const h = [...this.parents]
        if (h.length) {
            const el = this.get(h[h.length - 1])
            el && removeChilds(el)
            this.parents = this.parents.slice(0, h.length - 1)
        }
    },
    /**
     * @returns { HTMLElement }
     */
    get(v) {
        return v
    },
    /**
     * @param { object } object 
     * @returns { string }
     */
    fromObject(object) {
        return Object.keys(object).map(key => object[key].join('.<br>') + '.').join('<br>')
    },
    /**
     * @param { Array<string> } arr 
     */
    fromArray(arr) {
        return arr.join('.<br>')
    }
}

export const Btn = {
    btns: [],
    /**
     * @param { HTMLButtonElement } element 
     */
    loading(element) {
        if (!element) return
        this.btns.push({
            element: element,
            html: element.innerHTML
        })
        element.disabled = true
        element.innerHTML = `
            <div class="d-flex align-content-center"> 
                <span>
                    ${Localize({
            fr: 'Chargement',
            en: 'Loading'
        })}
                </span>
                <span class="mx-1"></span>
                <spinning-dots style="width: 20px" />
            <div/>
        `
    },
    hide() {
        const h = [...this.btns]
        if (h.length) {
            const n = (h[h.length - 1])
            const el = this.get(n.element)
            el.disabled = false
            el && removeChilds(el)
            el.innerHTML = n.html
            this.btns = this.btns.slice(0, h.length - 1)
        }
    },
    /**
     * @returns { HTMLButtonElement }
     */
    get(v) {
        return v
    },
}
/**
 * @param { HTMLElement | EventTarget } target
 * @returns { HTMLButtonElement }
*/
// @ts-ignore
export const FormBtn = (target) => target ? target.querySelector('button[type="submit"]') : null

/**
 * @param { FormData } form 
 * @param { Element | HTMLElement } parent 
 */
export const resetFormFields = (form, parent) => {
    form.forEach((_, k) => {
        const h = parent.querySelector(`[name="${k}"]`)
        // @ts-ignore
        h && (h.value = '')
    })
}