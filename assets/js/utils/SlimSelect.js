import SlimSelect from 'slim-select'
import { Localize } from '../functions/localize'

/**
 * @param { HTMLElement|Element } element 
 * @param { import('slim-select').Constructor } option
 */
export const slim = (element, option = {}) => {
    return new SlimSelect({
        select: element,
        searchPlaceholder: Localize({ en: 'Search', fr: 'Recherche' }),
        ...option
    })
}