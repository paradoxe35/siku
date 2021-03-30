//@ts-check
import axios from 'axios'
import { Notifier } from '@js/functions/notifier'
import { HtmlAlert } from '@js/functions/dom'

export const setI18nLanguage = (lang) => {
    axios.defaults.headers.common['CLIENT-LANG'] = lang
    document.querySelector('html').setAttribute('lang', lang)
}

setI18nLanguage(document.querySelector('html').getAttribute('lang'))


export const getLocaleTz = () => Intl.DateTimeFormat().resolvedOptions().timeZone

export const setTz = ($tz = null) => {
    try {
        const tz = $tz || getLocaleTz();
        axios.defaults.headers.common['CLIENT-TZ'] = tz
    } catch (error) {
        console.error(error)
    }
}
setTz()


/**
 * @param { { response?:import('axios').AxiosResponse } } error 
 * @param { boolean } mustNotifierErrors 
 * @param { number } reloadStatus 
 */
export const errorResponse = (error, mustNotifierErrors = false, reloadStatus = 0) => {
    if (error.response) {
        !!reloadStatus && error.response.status === reloadStatus && window.location.reload()
        mustNotifierErrors && Notifier.error(HtmlAlert.message(error.response.data), 7000);
    }
    return Promise.reject(error.response ? error.response.data : error)
}

/**
 * @param {string} method 
 * @param {string} url 
 * @param { FormData | Object } datas 
 * @param { boolean } [mustNotifierErrors=false] 
 * @param { number } [reloadStatus=0]
 * @returns { Promise<import('axios').AxiosResponse<any>> }
 */
export const ApiRequest = async (method = 'get', url, datas = {}, mustNotifierErrors = false, reloadStatus = 0) => {
    try {
        return await Api[method.toLowerCase()](url, datas)
    } catch (error) {
        return errorResponse(error, mustNotifierErrors, reloadStatus)
    }
}

const params = {
    timeout: 300 * 1000,
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

    /**
     * 
     * @param {*} url 
     * @param {*} datas 
     * @param {import('axios').AxiosRequestConfig} config 
     */
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

    static toObject(datas) {
        let $datas = {};
        if (datas instanceof FormData) {
            datas.forEach((value, key) => ($datas[key] = value))
        } else {
            $datas = { ...datas }
        }
        return $datas;
    }

    static async put(url, datas = {}, config = {}) {
        const $datas = this.toObject(datas)
        try {
            const res = this.Axs.put(url, $datas, config)
            return res
        } catch (error) {
            throw new Error(error)
        }
    }

    static async patch(url, datas = {}, config = {}) {
        const $datas = this.toObject(datas)
        try {
            const res = this.Axs.patch(url, $datas, config)
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
