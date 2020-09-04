//@ts-check
/**
 * @param { Object } trans 
 * @param { string } defaults
 * @returns { string }
 */
export const Localize = (trans = {}, defaults = 'fr') => {
    const lang = document.querySelector('html').lang
    return trans[lang] ? trans[lang] : trans[defaults]
}