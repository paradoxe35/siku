//@ts-check
import axios from 'axios'
import { Notifier } from '@js/functions/notifier'
import { HtmlAlert } from '@js/functions/dom'

export const setI18nLanguage = (lang) => {
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
}

export const errorResponse = (error, mustNotifierErrors = false) => {
    if (error.response && mustNotifierErrors)
        Notifier.error(HtmlAlert.message(error.response.data));
    return Promise.reject(error.response ? error.response.data : error)
}

/**
 * @param {string} method 
 * @param {string} url 
 * @param { FormData | Object } datas 
 * @returns { Promise<import('axios').AxiosResponse<any>> }
 */
export const ApiRequest = async (method = 'get', url, datas = {}, mustNotifierErrors = false) => {
    try {
        return await Api[method.toLowerCase()](url, datas)
    } catch (error) {
        return errorResponse(error, mustNotifierErrors)
    }
}

const params = {
    timeout: 30000,
    headers: {
        'X-Requested-With': 'XMLHttpRequest'
    }
}

export const Axios = axios.create(params);
export const AxiosAdmin = axios.create(params);

export default class Api {

    static get Axs() {
        return Axios
    }

    static async get(url, config = {}) {
        try {
            const res = this.Axs.get(url, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static async post(url, datas = {}, config = {}) {
        try {
            const res = this.Axs.post(url, datas, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static async delete(url, config = {}) {
        try {
            const res = this.Axs.delete(url, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static async put(url, datas = {}, config = {}) {
        let $datas = {};
        if (datas instanceof FormData) {
            datas.forEach((value, key) => ($datas[key] = value))
        } else {
            $datas = { ...datas }
        }
        try {
            const res = this.Axs.put(url, $datas, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        }
        return text.replace(/[&<>"']/g, (m) => {
            return map[m]
        })
    }

}

export class ApiAdmin extends Api {
    static get Axs() {
        return AxiosAdmin
    }
}
