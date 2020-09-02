import axios from 'axios'
/**
 * 
 * @param {string} name 
 */
export const getCookie = (name) => {
    const cookieArr = document.cookie.split(";")
    for (let index = 0; index < cookieArr.length; index++) {
        const cookiePair = cookieArr[index].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1])
        }
    }
    return null
}

export const setI18nLanguage = (lang) => {
    axios.defaults.headers.common['Accept-Language'] = lang
    document.querySelector('html').setAttribute('lang', lang)
}

export const setCookie = (name, value, daysToLive) => {
    let cookie = `${name}=${encodeURIComponent(value)}`
    if (typeof daysToLive === 'number') {
        cookie += `; max-age=${daysToLive * 24 * 60 * 60}`
    }
    document.cookie = cookie
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

    /**
     * 
     * @param { string } url 
     * @param {FormData || Object} datas 
     * @param { string } config 
     */
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
