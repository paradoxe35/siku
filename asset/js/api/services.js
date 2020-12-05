//@ts-check
import axios from 'axios'

const Axios = axios.create({ headers: {} })
Object.keys(Axios.defaults.headers.common)
    .forEach((key) => {
        if (key.startsWith('CLIENT-')) {
            delete Axios.defaults.headers.common[key]
        }
    })


/**
 * @returns { Promise<{ country_code:any,  }> }
 */
export async function customerCountryApi() {
    try {
        const { data } = await Axios.get("https://ipapi.co/json")
        return data;
    } catch (e) {
        throw Error(e);
    }
}


export function getCountryFlag(code = '') {
    return `https://flagcdn.com/${code.toLocaleLowerCase()}.svg`
}

/**
 * @returns { Promise<Array> }
 */
export async function countriesFlagAndEmojis() {
    try {
        const countries = window.localStorage.getItem('countries');
        if (countries) return JSON.parse(countries)
    } catch (_) { }

    try {
        const { data } = await Axios.get('https://unpkg.com/country-flag-emoji-json@1.0.2/json/flag-emojis.json')
        window.localStorage.setItem('countries', JSON.stringify(data))
        return data
    } catch (_) {
        return []
    }
}

/**
 * @param { Object } parameters 
 */
export async function customerRequestByEmailJs(parameters) {
    const emailjs = (await import('emailjs-com')).default
    const res = await emailjs.send('service_v5xhq1s', 'template_L56IFB0o', parameters, 'user_T665iVWpCUUDukHwk9Yhw')
    if (res.status == 200) {
        return true
    }
    throw Error()
}