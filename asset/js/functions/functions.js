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



const inLoading = {}

export const loadScript = (url, callback = null) => {
    if (url in inLoading) {
        if (inLoading[url].loaded) {
            callback && callback()
        } else {
            inLoading[url].callbacks.push(callback)
        }
        return
    }

    inLoading[url] = {
        loaded: false,
        callbacks: [callback]
    }

    const script = document.createElement('script');
    script.setAttribute('src', url);

    script.onload = () => {
        inLoading[url].loaded = true;
        inLoading[url]
            .callbacks.forEach((cb) => (cb && cb()))
    };

    script.setAttribute('charset', 'utf-8');

    document.head.appendChild(script);
}

const loadedScripts = [];
export const loadStylesheet = (url, callback = null) => {
    if (loadedScripts.includes(url)) {
        callback && callback()
        return
    }
    const script = document.createElement('link');

    script.href = url;
    script.onload = callback;
    script.rel = 'stylesheet';
    loadedScripts.push(url)

    document.head.appendChild(script);
}

// @ts-ignore
export const SYMBOL = window.symbol