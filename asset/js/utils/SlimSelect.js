import SlimSelect from 'slim-select'

/**
 * @param { HTMLElement } element 
 * @param { import('slim-select').Constructor } option
 */
export const slim = (element, option = {}) => {
    return new SlimSelect({
        select: element,
        ...option
    })
}