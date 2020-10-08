//@ts-check
import { customerCountryApi } from '../api/services'

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
        customerCountryApi()
            .then(async (c) => c && SlimSelect.setData(await callbackData(c)))
    }
    return SlimSelect
}