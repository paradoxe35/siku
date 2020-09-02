import Api from "@js/api/api"
import { INprogress } from "@js/functions/NProgress";

/**
 * @param { String } url 
 * @param { String } locale 
 */
export const ChangeLocale = async (url, locale) => {
    INprogress.set()
    try {
        await Api.post(encodeURI(url), { locale });
    } catch (error) { }
    INprogress.unset()
    return;
}
