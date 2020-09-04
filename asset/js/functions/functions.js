//@ts-check
/**
 * 
 * @param { Function } callback 
 * @param { number } delay 
 */
export function debounce(callback, delay = 1000) {
    let timer;
    return function () {
        const args = arguments;
        const context = this;
        clearTimeout(timer);
        timer = setTimeout(function () {
            callback.apply(context, args);
        }, delay)
    }
}