import SlimSelect from 'slim-select'

/**
 * @param { HTMLElement } element 
 * @param { Object } option
 */
export const slim = (element, option = {}) => {
    return new SlimSelect({
        select: element,
        ...option
    })
}