//@ts-check
import { customerCountryApi } from '../api/services'

/**
 * @param { HTMLElement } select 
 * @param { CallableFunction } callbackData 
 */
export const clientCountry = async (select, callbackData) => {
    const { slim } = await import('@/js/utils/SlimSelect')
    const SlimSelect = slim(select, {
        placeholder: '...'
    })
    customerCountryApi()
        .then(async (c) => c && SlimSelect.setData(await callbackData(c)))
    return SlimSelect
}