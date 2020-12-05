//@ts-check
import { countriesFlagAndEmojis, customerCountryApi } from '../api/services'

let geoData = null

const fetchIpGeo = async () => {
    if (geoData) return geoData
    try {
        const data = await customerCountryApi()
        geoData = data
        return data
    } catch (error) {
        return null
    }
}
fetchIpGeo()

/**
 * @param { HTMLElement|Element } select 
 * @param { CallableFunction } callbackData 
 */
export const clientCountry = async (select, callbackData, defaultValue = null) => {
    const { slim } = await import('@/js/utils/SlimSelect')
    // @ts-ignore
    const SlimSelect = slim(select, {
        placeholder: '...'
    })
    if (defaultValue) {
        SlimSelect.setData(await callbackData(defaultValue))
    } else {
        fetchIpGeo()
            .then(async (c) => {
                SlimSelect.setData(await callbackData(c || { code: "CA" }))
            })
    }
    return SlimSelect
}

/**
 * @param { Element | HTMLElement } element 
 * @param {Function } connectedCountry 
 * @param { * } defaults
 */
export const initSelect2 = async (element, connectedCountry, defaults = null) => {
    const select = await clientCountry(element, async (c) => {
        const countries = await countriesFlagAndEmojis()
        return countries.map(country => {
            const sc = c.country_code == country.code;
            sc && connectedCountry(country)
            return {
                text: `${country.emoji} ${country.name}`,
                value: country.code,
                selected: sc
            }
        })
    }, defaults)
    select.onChange = (c) => {
        const h = c.text.split(' ')
        connectedCountry({
            name: h.filter((_, i) => !!i).join(' '),
            code: c.value
        });
    }

    return select
}