//@ts-check

import { Localize } from "./localize";

/**
 * 
 * @param { Function } func 
 * @param { number } wait 
 */
export function debounce(func, wait = 1000, immediate) {
    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export function confirmed() {
    return confirm(Localize({
        fr: 'Êtes-vous sûr ?',
        en: 'Are you sure ?',
    }))
}

export function stripHtml(html) {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

// @ts-ignore
export const SYMBOL = window.symbol